import { Injectable } from '@nestjs/common';

@Injectable()
export class FileFetcher {
  fetchAllFiles(url: string): Observable<{ data: string; link: string }> {
    let currentPageLink: string | null = null;
    let pageNumber = 1;
    if (!currentPageLink) {
      currentPageLink = `${this.url}`;
    }
    return this.fetchFile(currentPageLink, pageNumber).pipe(
      expand((response) => {
        if (response.link) {
          return this.fetchFile(response.link, pageNumber++);
        } else {
          return EMPTY;
        }
      }),
    );
  }
}
