import httpService from "../../service/HttpService";
import ApiConfig from "../../service/ApiConfig";
import { IMusic,IMusicForm } from "./Music.type";


export const getMusicListApi = async () => {
  return await httpService.get<IMusic[]>(ApiConfig.music);
};

export const createMusicApi=async (data:IMusicForm)=>{
return await httpService.post<IMusic>(ApiConfig.music,data)
}

export const deleteMusicApi=async (id : number)=>{
  const url = `${ApiConfig.music}/${id}`
  return await httpService.delete(url)
}

export const updateMusicApi = async (id:number,data:IMusicForm)=>{
  const url = `${ApiConfig.music}/${id}`;
  return await httpService.put(url,data)
}