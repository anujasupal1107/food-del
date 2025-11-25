import { createContext, useEffect, useState } from "react";
import { food_list as mock_food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [food_list, setFoodList] = useState(mock_food_list);
    const [offline, setOffline] = useState(true);

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token && !offline) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token && !offline) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            const data = response?.data?.data;
            if (Array.isArray(data) && data.length) {
                setFoodList(data);
                setOffline(false);
            } else {
                setFoodList(mock_food_list);
                setOffline(true);
            }
        } catch (e) {
            setFoodList(mock_food_list);
            setOffline(true);
        }
    }

    const loadCartData = async (token) => {
        if (offline) return; 
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    // mock auth helpers
    const localUsersKey = "mock_users";
    const readUsers = () => {
        try { return JSON.parse(localStorage.getItem(localUsersKey) || "[]"); } catch { return []; }
    };
    const writeUsers = (arr) => localStorage.setItem(localUsersKey, JSON.stringify(arr));

    const register = async ({ name, email, password }) => {
        if (!offline) {
            const res = await axios.post(url + "/api/user/register", { name, email, password });
            return res.data;
        }
        const users = readUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: "User already exists" };
        }
        const user = { id: Date.now().toString(), name, email, password };
        users.push(user);
        writeUsers(users);
        return { success: true, token: "mock-" + user.id };
    };

    const login = async ({ email, password }) => {
        if (!offline) {
            const res = await axios.post(url + "/api/user/login", { email, password });
            return res.data;
        }
        const users = readUsers();
        const user = users.find(u => u.email === email);
        if (!user) return { success: false, message: "User does not exist" };
        if (user.password !== password) return { success: false, message: "Invalid credentials" };
        return { success: true, token: "mock-" + user.id };
    };

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
        offline,
        register,
        login
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;