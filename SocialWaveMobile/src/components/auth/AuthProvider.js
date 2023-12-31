import { createContext, useContext, useState } from "react";
import { login as loginApi, getData, checkUserAdmin } from "../../service/ServiceUtil"


const AuthContext = createContext();

const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ( { children } )=>{

    const [user, setUser] = useState(null)

    const login = async (login, senha)=>{
        
        const vuLogin = await loginApi(login, senha);


        if (!vuLogin){
            return vuLogin
        }else{
            const vu = await getData(login);
            const adminRole = await checkAdmin(vu.id);

            setUser({ username: vu.userName,
                            login: vu.email,
                            profile: adminRole ? 'Admin' : 'Member', 
                            id: vu.id,
                            token: Math.random()*10000000000 }); 
                return true
        }
    }

    const logout = ()=>{
        setUser(null);
    }
    
    const userType = ()=>{
        if(user === null)
            return null;
        return user.profile;
    }

    const isMember = ()=>{
        return userType() === 'Member'
    }
    const isAdmin = ()=>{
        return userType() === 'Admin'
    }


    const checkAdmin = async (id) => {
        try {
            const adminStatus = await checkUserAdmin(id);
            return adminStatus;
        } catch (error) {
            console.error("Erro ao verificar admin:", error);
            return false;
        }
    };

    return(
        <AuthContext.Provider value={{user, login, logout, 
        isMember, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )

} 

export { useAuth, AuthProvider }