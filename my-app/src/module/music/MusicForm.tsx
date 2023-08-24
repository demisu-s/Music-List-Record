import style from "./MusicForm.module.css";
import { Input } from "../../components";
import { ChangeEvent, useEffect, useState, useRef } from "react"; // Import useRef
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createMusicAction, resetCreateListStatus, updateMusicAction } from "./MusicSlice";
import { ApiStatus, IMusicForm, IUpdateMusicActionProps } from "./Music.type";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";

interface IProps {
  isEditForm?: boolean;
}

const MusicForm = (props: IProps) => {
  const { isEditForm } = props;

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [musicFile, setMusicFile] = useState("");

  const params = useParams();
  const musicIdToEdit = useRef(parseInt(params.id || ""));

  const { list } = useAppSelector((state: RootState) => state.music);

  useEffect(() => {
    if (isEditForm && musicIdToEdit.current) {
      //list of user
      const musicData = list.filter((x) => x.id === musicIdToEdit.current);
      if (musicData.length) {
        setTitle(musicData[0].title);
        setName(musicData[0].name);
        setMusicFile(musicData[0].musicFile);
      }
    }
  }, [isEditForm]);

  const { createMusicFormStatus, updateMusicFormStatus } = useAppSelector(
    (state: RootState) => state.music
  );
  const dispatch = useAppDispatch();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const data: IMusicForm = { title, name, musicFile };

    if (isEditForm) {
      //update the records
      const dirtyFormData:IUpdateMusicActionProps = {id:musicIdToEdit.current,data}
      dispatch(updateMusicAction(dirtyFormData))
    } else {
      dispatch(createMusicAction(data));
    }
  };

  useEffect(() => {
    if (createMusicFormStatus === ApiStatus.success) {
      setTitle("");
      setName("");
      setMusicFile("");
      dispatch(resetCreateListStatus());
    }
  }, [createMusicFormStatus]);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={onSubmitForm}>
        <Input
          label="Music Title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          label="Artist"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Upload Music"
          value={musicFile}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setMusicFile(e.target.value);
          }}
        />

        <div className={style["btn-wrapper"]}>
          <input
            type="submit"
            value={isEditForm ? "Update" : "Create"}
            disabled={
              createMusicFormStatus == ApiStatus.loading ||
              updateMusicFormStatus === ApiStatus.loading
            }
          />
        </div>
      </form>
    </div>
  );
};

export default MusicForm;
