"use client";

import { useFetch } from "../../../../hooks/useFetch";
import { Committee, Exam } from "../../../../types/typings";

function generateHtml(exam: Exam) {
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

  return `
    <p><img style="margin: 10px; float: left;" src="images/other/talarsapka.jpg" alt="talarsapka" width="200" height="150" /><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">Az Informatikai Tudományok Doktori Iskola 2023. január 12-én 13 órai kezdettel az egyetem ${exam.building} épületének ${exam.room}-os termében komplex vizsgát tart. </span><br /><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">${exam.student.lastname} ${exam.student.firstname} doktorandusz hallgató a komplex vizsgához szükséges kötelezettségét teljesítette, ezért kérése alapján a Doktori Iskola Tanácsa engedélyezte számára a komplex vizsgát.</span></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <hr id="system-readmore" />
    <div>&nbsp; <span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;">A komplex vizsga bizottság:</span></div>
    <div>&nbsp;</div>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%;"><span style="font-weight: normal; font-size: 12pt;">Elnök:</span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><span style="font-weight: normal; font-size: 12pt; font-family: times new roman, times;"><span style="font-size: 12pt; color: #00000a;">${chairman.lastname} ${chairman.firstname}, ${chairman.degree}, ${chairman.uni_role}, ${chairman.short_institution_name}</span></span></p>
    <p>&nbsp;</p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%;"><span style="font-weight: normal; font-size: 12pt;">Vizsgáztatók: </span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><span style="font-weight: normal; font-size: 12pt;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${main_subj_examiner?.lastname} ${main_subj_examiner?.firstname}, ${main_subj_examiner?.degree}, ${main_subj_examiner?.uni_role}, ${main_subj_examiner?.short_institution_name}</span>&nbsp;<span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${exam.main_subject}</span> (fõtárgy)</span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><span style="font-weight: normal; font-size: 12pt;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${other_subj_examiner?.lastname} ${other_subj_examiner?.firstname}, ${other_subj_examiner?.degree}, ${other_subj_examiner?.uni_role}, ${other_subj_examiner?.short_institution_name}</span>&nbsp;<span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${exam.other_subject}</span> (melléktárgy)</span></p>
    <p>&nbsp;</p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%;"><span style="font-weight: normal; font-size: 12pt;">Tagok: </span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><span style="font-weight: normal; font-size: 12pt;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${commission_members[0].lastname} ${commission_members[0].firstname}, ${commission_members[0].degree}, ${commission_members[0].uni_role}, ${commission_members[0].short_institution_name}</span></span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><span style="color: #00000a;"><span style="font-size: medium;"><span lang="hu-HU"><span style="font-style: normal;"><span style="font-weight: normal;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">${commission_members[1].lastname} ${commission_members[1].firstname}, ${commission_members[1].degree}, ${commission_members[1].uni_role}, ${commission_members[1].short_institution_name}</span></span></span></span></span></span><span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;"><span style="font-size: 12pt;"></span></span></p>
    <p class="western" style="margin-right: 0.32cm; margin-bottom: 0cm; line-height: 100%; padding-left: 120px;"><br /><span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;"><span style="font-size: 12pt;"></span></span></p>
    <div>
    <div><span style="font-size: medium;"></span><span style="font-size: medium;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif; color: #00000a;">A komplex vizsga nyilvánosságát személyes és online elérhetõséggel is biztosítjuk, az online jelenlét iránt érdeklõdõk egy kérdõív kitöltése és beküldése után kapnak hozzáférési linket. A kérdõív az érdeklõdõk számára az alábbi címen hozzáférhetõ:</span></span></div>
    <div>
    <p style="margin-right: 7px; text-align: justify;"><a href="${exam.link}">${exam.link}</a></p>
    <span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></div>
    <div><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">A komplex vizsga nyilvános, arra minden érdeklõdõt tisztelettel meghívunk!</span></div>
    </div>
    <p>&nbsp;</p>
  `;
}

export default generateHtml;
