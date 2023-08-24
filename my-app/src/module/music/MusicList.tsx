import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IMusic } from "./Music.type";
import { deleteMusicAction, getMusicListAction } from "./MusicSlice";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const MusicList = () => {
  const [musicDataToView, setMusicDataToView] = useState<IMusic | null>(null);
  const { list, listStatus } = useAppSelector(
    (state: RootState) => state.music
  );
  const dispatch = useAppDispatch();

  const navigator = useNavigate()

  useEffect(() => {
    dispatch(getMusicListAction());
  }, [dispatch]);
  return (
    <>
      <table>
        <tr>
          <th>No</th>
          <th>Music Title</th>
          <th>Artist</th>
          <th>Music</th>
          <th>Action</th>
        </tr>
        {listStatus === ApiStatus.loading && <tbody>List is Loading</tbody>}
        {listStatus === ApiStatus.error && (
          <tbody>Error while Loading List</tbody>
        )}

        {listStatus === ApiStatus.ideal &&
          list.map((music: IMusic, index: number) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{music.title}</td>
                <td>{music.name}</td>
                <td>{music.musicFile}</td>
                <td>
                  <div>
                    <input type="button" value="View" onClick={()=>{
                      setMusicDataToView(music)
                    }}/>
                    <input type="button" value="Edit" onClick={()=>{
                      navigator(`/edit/${music.id}`)



                    }} />
                    <input type="button" value="Delete" onClick={()=>{
                      dispatch(deleteMusicAction(music.id))
                    }} />
                  </div>
                </td>
              </tr>
            );
          })}
      </table>

      {musicDataToView && (
        <Modal title="User Detail" onClose={() => {setMusicDataToView(null)}}>
          <div>
          <div>
            <label>Music Title :{musicDataToView.title}</label>
          </div>
          <div>
            <label>Name:{musicDataToView.name}</label>
          </div>
          <div>
            <label>Upload:{musicDataToView.musicFile}</label>
          </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default MusicList;
