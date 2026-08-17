import './Footer.css';

export default function Footer() {

    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <span className="mono">© {new Date().getFullYear()} Fulltone Studiomax. All rights reserved. {new Date().getFullYear()}</span>
                <span className="mono">Nairobi based Company</span>
            </div>
        </footer>
    );
}