export type Committee = {
  firstname: string;
  lastname: string;
  degree: string;
  uni_role: string;
  institution_name: string;
  short_institution_name: string;
  department_name: string;
  main_subj_examiner: boolean;
  other_subj_examiner: boolean;
};

export type Exam = {
  commission: Committee[];
  date: Date;
  main_subject: string;
  other_subject: string;
  student: Student;
  venue: string;
};

export type Student = {
  firstname: string;
  lastname: string;
  consultant1: Consultant;
  consultant2: Consultant;
  email: string;
  financing: string;
  tablename: string;
  title: string;
};

export type Consultant = {
  firstname: string;
  lastname: string;
  degree: string;
  institution_name: string;
  department_name: string;
  email: string;
  faculty_name: string;
  role: string;
  tablename: string;
  title: string;
  uni_role: string;
};
