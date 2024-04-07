import axios from '../axios/InstanceAxios';
import { API_URL } from '../const/SpotifyConst';

export class SpotifySevises {
    static async getTopArtists (limit=20) {
        return await SpotifySevises.search('artist', 'artist', limit)
    }
    static async getTopAlbum (limit=20) {
        return await SpotifySevises.search('album', 'album', limit)
    }
    static async search (key, type, limit) {
        return await axios.get(`${API_URL}/search?q=${key}&type=${type}&limit=${limit}`)
    }
    static async getTopTracksOfArtistById (id) {
        return await axios.get(`${API_URL}/artists/${id}/top-tracks`)
    }
    static async getTrackById(id) {
        return await axios.get(`${API_URL}/tracks/${id}`)
    }
    static async GetAlbumTracks(id) {
        return await axios.get(`${API_URL}/albums/${id}/tracks`)
    }
}