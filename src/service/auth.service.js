import axios from "../axios/InstanceAxios";
import {API_URL} from "../const/SpotifyConst";

class AuthService {
    static async getUserProfile() {
        return await axios.get(`${API_URL}/me`);
    }

    static async getArtists(ids) {
        return await axios.get(`${API_URL}/artists?ids=${ids}`);
    }
}

export default AuthService;