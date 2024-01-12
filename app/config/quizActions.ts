export type Quiz = {
  name: string;
  owner: string;
  quizes: Quizes[];
};

export type Choice = { choice: string; correct: boolean, id: string };

export type Quizes = {
  question: string;
  choices: Choice[];
};

