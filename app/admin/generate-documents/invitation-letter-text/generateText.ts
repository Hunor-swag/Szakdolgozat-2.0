import { greet } from "../../../../functions/greet";
import { Committee, Exam } from "../../../../types/typings";

export default function generateText(exam: Exam, committee: Committee) {
  const chairman = exam.commission[0];
  const main_subj_examiner = exam.commission.find(
    (person: Committee) => person.main_subj_examiner === true
  );
  const other_subj_examiner = exam.commission.find(
    (person: Committee) => person.other_subj_examiner === true
  );
  const commission_members: Committee[] = exam.commission.filter(
    (person: Committee, index: number) => {
      return (
        person.main_subj_examiner === false &&
        person.other_subj_examiner === false &&
        index !== 0
      );
    }
  );

  let text = "";
  text += greet(committee);
  text += "\n\n";
  text +=
    "A Pannon Egyetem Informatikai Tudományok Doktori Iskolájának megbízásából tisztelettel szeretném felkérni ";
  text +=
    exam.student.lastname +
    " " +
    exam.student.firstname +
    " doktorjelölt (témavezetõi: ";
  text +=
    exam.student.consultant1.lastname +
    " " +
    exam.student.consultant1.firstname;
  if (exam.student.consultant2) {
    text +=
      ", " +
      exam.student.consultant2.lastname +
      " " +
      exam.student.consultant2.firstname;
  }
  text += ") komplex vizsga bizottságában való részvételre.\n\n";

  text +=
    "A Doktori Iskola vezetõje az alábbi komplex vizsga bizottság felállítására tett javaslatot, amelyet a Doktori Iskola Tanácsa is elfogadott:\n\n";

  text += "elnök: \t";
  text += chairman.lastname + " " + chairman.firstname + ", ";
  text += chairman.degree + ", ";
  text += chairman.uni_role + ", ";
  text += chairman.short_institution_name + "\n\n";

  text += "tagok: \t";
  text +=
    main_subj_examiner?.lastname + " " + main_subj_examiner?.firstname + ", ";
  text += main_subj_examiner?.degree + ", ";
  text += main_subj_examiner?.uni_role + ", ";
  text += main_subj_examiner?.short_institution_name + ", ";
  text += "a " + exam.main_subject + " fõtárgy vizsgáztatója\n\n";

  text += "\t\t";
  text +=
    other_subj_examiner?.lastname + " " + other_subj_examiner?.firstname + ", ";
  text += other_subj_examiner?.degree + ", ";
  text += other_subj_examiner?.uni_role + ", ";
  text += other_subj_examiner?.short_institution_name + ", ";
  text += "a " + exam.other_subject + " melléktárgy vizsgáztatója\n\n";

  text += "\t\t";
  text +=
    commission_members[0]?.lastname +
    " " +
    commission_members[0]?.firstname +
    ", ";
  text += commission_members[0]?.degree + ", ";
  text += commission_members[0]?.uni_role + ", ";
  text += commission_members[0]?.short_institution_name + "\n\n";

  text += "\t\t";
  text +=
    commission_members[1]?.lastname +
    " " +
    commission_members[1]?.firstname +
    ", ";
  text += commission_members[1]?.degree + ", ";
  text += commission_members[1]?.uni_role + ", ";
  text += commission_members[1]?.short_institution_name + "\n\n";

  text +=
    "Tisztelettel kérem, hogy a fenti komplex vizsga bizottságban való tisztség elfogadására/elutasítására vonatkozó válaszát postafordultával szíveskedjék megküldeni a Doktori Iskola e-mail címére: di@virt.uni-pannon.hu\n\n";

  text += "Szíves közremûködését elõre is köszönöm!\n\n";

  text += "Tisztelettel:\nDulai Tibor\naz ITDI titkára";

  return text;
}
