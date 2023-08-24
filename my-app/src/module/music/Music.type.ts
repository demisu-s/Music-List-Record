export interface IMusic {
    id: number;
    name: string;
    title: string;
    musicFile:string;
     
  }
  export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
  }
  export interface IMusicState {
    list: IMusic[];
    listStatus: ApiStatus;
    createMusicFormStatus:ApiStatus;
    updateMusicFormStatus:ApiStatus;
  }
  export interface IMusicForm{
    title:string;
    name:string;
    musicFile:string;
  }
  export interface IUpdateMusicActionProps{
    id:number;
    data:IMusicForm;
  }
  