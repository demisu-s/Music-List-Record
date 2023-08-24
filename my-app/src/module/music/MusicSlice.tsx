import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiStatus,
  IMusicForm,
  IMusicState,
  IUpdateMusicActionProps,
} from "./Music.type";
import {
  getMusicListApi,
  updateMusicApi,
  createMusicApi,
  deleteMusicApi,
} from "./MusicService";

const initialState: IMusicState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createMusicFormStatus: ApiStatus.ideal,
  updateMusicFormStatus: ApiStatus.ideal,
};
//API1
export const getMusicListAction = createAsyncThunk(
  "music/getMusicListAction",
  async () => {
    const response = await getMusicListApi();
    return response.data;
    //create api
    //return response
  }
);
//APi2
export const createMusicAction = createAsyncThunk(
  "music/createMusicAction",
  async (data: IMusicForm) => {
    const response = await createMusicApi(data);
    return response.data;
    //create api
    //return response
  }
);

export const deleteMusicAction = createAsyncThunk(
  "music/deleteMusicAction",
  async (id: number) => {
    await deleteMusicApi(id);
    return id;
    //call delete api
    //return id
  }
);

export const updateMusicAction = createAsyncThunk(
  "music/updateMusicAction",
  async ({ id, data }: IUpdateMusicActionProps) => {
    const response = await updateMusicApi(id, data);
    return response.data;
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    resetCreateListStatus: (state) => {
      state.createMusicFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMusicListAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getMusicListAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getMusicListAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });

    builder.addCase(createMusicAction.pending, (state) => {
      state.createMusicFormStatus = ApiStatus.loading;
    });
    builder.addCase(createMusicAction.fulfilled, (state) => {
      state.createMusicFormStatus = ApiStatus.success;
    });
    builder.addCase(createMusicAction.rejected, (state) => {
      state.createMusicFormStatus = ApiStatus.error;
    });

    builder.addCase(deleteMusicAction.fulfilled, (state, action) => {
      const newList = state.list.filter((x) => x.id !== action.payload);
      state.list = newList;
    });
    builder.addCase(updateMusicAction.pending, (state) => {
      state.updateMusicFormStatus = ApiStatus.loading;
    });
    builder.addCase(updateMusicAction.fulfilled, (state) => {
      state.updateMusicFormStatus = ApiStatus.ideal;
    });
    builder.addCase(updateMusicAction.rejected, (state) => {
      state.updateMusicFormStatus = ApiStatus.error;
    });
  },
});

export default musicSlice.reducer;
export const { resetCreateListStatus } = musicSlice.actions;
