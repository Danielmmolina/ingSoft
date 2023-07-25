import { Outlet } from "react-router-dom"

export const LayoutMain = () => {
    return (
        <section className="layout__content">
            <Outlet />
            <h1>Hola</h1>
        </section>
    )
}
