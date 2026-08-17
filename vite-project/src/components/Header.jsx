import './Header.css'

//Props: 1. projectCount (number) - this should show the total number of projects currently
//Props: 2. onAddClick (function) - Opens the add project form

export default function Header ({ projectCount, onAddClick}) {
    return(
        <header className="site-header">
            <div className="containeer site-header__inner">
                <div className="site-header__Brand">
                    <span className="site-header__mark" aria-hidden="true">
                         ~
                    </span>
                    <span className="site-header__name">Fulltone studiomax</span>
                </div>

                <nav className="site-header__meta mono" aria-label="Catalogue status">
                    <span>{String(projectCount).padStart(3, '0')} works indexed</span>
                </nav>

                <button type="button" className="site-header__cta" onClick={onAddClick}>
                    + Add Project
                </button>
            </div>
        </header>
    );

}