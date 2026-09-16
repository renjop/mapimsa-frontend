import React from 'react';
import {CButton} from '@coreui/react';

class ScrollToTopComponent extends React.Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div>
                <CButton
                    color={'link'}
                    as={'a'}
                    className="border rounded d-inline scroll-to-top"
                    onClick={() => this.scrollToTop()}
                >
                    <i className="fas fa-angle-up"/>
                </CButton>
            </div>
        );
    }
}

export default ScrollToTopComponent;
