import React from 'react';
import { CCol, CPagination, CPaginationItem, CRow } from '@coreui/react';

type GotoPageProps = (page: number) => void;

interface PagerComponentProps {
  gotoPage: GotoPageProps;
  currentPage: number;
  from: number;
  lastPage: number;
  nextPageUrl?: string | null;
  to: number;
}

const PagerComponent: React.FC<PagerComponentProps> = (
  {
    gotoPage,
    currentPage,
    from,
    lastPage,
    nextPageUrl,
    to
  }) => {
  const nextPage: URL | null = nextPageUrl ? new URL(nextPageUrl) : null;
  const previousPages: number[] = [];
  const nextPages: number[] = [];
  if ((currentPage + 1) === 3) {
    previousPages.push(1);
  } else if ((currentPage + 1) > 3) {
    previousPages.push(currentPage - 2);
    previousPages.push(currentPage - 1);
  }
  for (let i = (currentPage + 1); i <= currentPage + 3 && i <= lastPage; i++) {
    nextPages.push(i);
  }
  return (
    <CRow>
      <CCol md={6}
            className={'align-self-center'}>
        <p role={'status'}
           aria-live={'polite'}>
          {from > 0 && to > 0 &&
            <>
              Mostrando {from} a {to}
            </>
          }

        </p>
      </CCol>
      <CCol md={6}>
        <CPagination>
          <CPaginationItem onClick={() => gotoPage(1)} disabled={currentPage === 1}>
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          <CPaginationItem onClick={() => gotoPage(currentPage - 1)} disabled={currentPage === 1}>
            <span aria-hidden="true">‹</span>
          </CPaginationItem>
          {
            previousPages.map(i =>
              <CPaginationItem onClick={() => gotoPage(i)}
                               key={`goto_${i}`}
              >
                {i}
              </CPaginationItem>
            )
          }
          <CPaginationItem active>{currentPage}</CPaginationItem>
          {
            nextPages.map(i => {
              return <CPaginationItem onClick={() => gotoPage(i)} key={`goto_${i}`}>{i}</CPaginationItem>;
            })
          }
          <CPaginationItem onClick={() => {
            if (nextPage !== null) {
              gotoPage(parseInt(nextPage.searchParams.get('page') ?? '1'));
            }
          }}
                           disabled={!nextPageUrl}>
            <span aria-hidden="true">›</span>
          </CPaginationItem>
          <CPaginationItem onClick={() => gotoPage(lastPage)}
                           disabled={currentPage === lastPage}>
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  );
};

export default PagerComponent;