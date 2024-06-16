//import { createApi } from "unsplash-js";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { z } from "zod";

function App() {
  const invalid_type_error: string = "field should be filled";

  const Note = z.object({
    title: z
      .string({ invalid_type_error })
      .min(3, { message: "title should be more than 3 characters" }),
    description: z
      .string({ invalid_type_error })
      .min(3, { message: "title should be more than 3 characters" }),
    tag: z
      .string({ invalid_type_error })
      .min(3, { message: "title should be more than 3 characters" }),
  });

  interface Notes {
    title: string;
    description: string;
    tag: string;
  }

  const [notes, setNotes] = useState<Notes>({
    title: "",
    description: "",
    tag: "",
  });

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotes({
      ...notes,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = Note.parse(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>Welcome to the note taking app </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tile</label>
        <input type="text" name="title" onChange={handelChange} id="title" />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          onChange={handelChange}
          id="description"
        />
        <label htmlFor="tag">Tag</label>
        <input type="text" name="tag" onChange={handelChange} id="tag" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
