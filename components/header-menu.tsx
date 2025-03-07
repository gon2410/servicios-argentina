import { createClient } from "@/utils/supabase/server";
import NavLink from "./NavLink";

const HeaderMenu = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
		<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink href="/services">Servicios</NavLink>
            <NavLink href="/providers">Proveedores</NavLink>
            <NavLink href="/search">Buscar</NavLink>

            {
                user ?
                <NavLink href="/myservices">Mis Servicios</NavLink>
                :
                <></>
            }
        </div>
        
    )
}

export default HeaderMenu;