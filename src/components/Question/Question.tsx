import React from "react";
import { decode } from "html-entities";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IQuestion } from "../Quiz/Quiz";
import { useFormContext } from "react-hook-form";
import "./question.css";

type QuestionProps = {
  question: IQuestion;
};

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { register, setValue } = useFormContext();

  const methods = register(question.id);

  return (
    <div className="quiz-question">
      <RadioGroup.Root
        className="quiz-question--item"
        {...methods}
        onValueChange={(value) => setValue(question.id, value)}
      >
        <div className="quiz-question--label">{decode(question.question)}</div>

        <div className="quiz-all-answers">
          {question.answers.map((answer) => (
            <div key={answer}>
              <RadioGroup.Item
                className="quiz-question-answer"
                value={answer}
                data-is-correct={answer === question.correct_answer}
              >
                {decode(answer)}
              </RadioGroup.Item>
            </div>
          ))}
        </div>
      </RadioGroup.Root>

      <div></div>
    </div>
  );
};

export default Question;
