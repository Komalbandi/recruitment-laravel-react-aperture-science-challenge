import { Subject } from "./subject";
import { SubjectResponseLinks } from "./subjectResponseLinks";
import { Paginiation } from "./pagination";

export interface SubjectResponse extends Paginiation {
  data: Subject[];
  links: SubjectResponseLinks[];
}
