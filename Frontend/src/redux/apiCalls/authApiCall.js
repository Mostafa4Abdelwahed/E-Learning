import { authActions } from "../slices/authSlice";
import request from "../../utils/request"
import { toast } from "react-toastify";
import swal from "sweetalert";

// Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/login", user)

            dispatch(authActions.login(data))
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


// Logout User
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem('userInfo')
    }
}

// Register User
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/register", {
                firstName: user.fName,
                lastName: user.lName,
                phoneNumber: user.phone,
                dadPhone: user.dPhone,
                region: user.regin,
                level: user.level,
                email: user.email,
                password: user.password
            });
            console.log(user);
            dispatch(authActions.register(data.message));
            swal({
                title: "تم إنشاء الحساب بنجاح, قم بتسجيل الدخول",
                icon: "success"
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}