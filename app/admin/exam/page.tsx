"use client";

import { useState } from "react";
import FormSelectInput from "../../../components/FormSelectInput";
import FormTextInput from "../../../components/FormTextInput";
import { students } from "../../../constants";

function Exam() {
  const [values, setValues] = useState({
    student: "",
    consultant: "",
    title: "",
    date: "",
    venue: "",
    main_subject: "",
    other_subjects: [""],
  });

  return (
    <form>
      <h1 className="text-5xl text-center mb-10">Complex exam</h1>
      <FormSelectInput
        labelContent="Hallgató "
        onChange={(e) => setValues({ ...values, student: e.target.value })}
        options={students}
      />
    </form>
  );
}

export default Exam;
