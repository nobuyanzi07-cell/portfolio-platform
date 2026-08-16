export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <span className="mono">© 2023 Fulltone Studiomax. All rights reserved. {new Date().getFullYear()}</span>
                <span className="mono">Nairobi based Company</span>
            </div>
        </footer>
    );
}