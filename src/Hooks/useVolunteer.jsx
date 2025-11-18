import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useValunteer = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isValunteer, isPending: isValunteerLoading} = useQuery({
        queryKey: [user?.email, 'isValunteer'],
        queryFn: async () => {
            const res  = await axiosSecure.get(`/users/valunteer/${user.email}`);
           
            return res.data?.valunteer;
        }
    })
    return [isValunteer, isValunteerLoading]
};

export default useValunteer;