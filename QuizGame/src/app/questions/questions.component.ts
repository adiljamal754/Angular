import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

public name: string = "";
public questionList: any = [];
public currentQuestion: number = 0;
public point: number = 0;
correctAnswer = 0;
incorrectAnswer = 0;

counter = 15;


  constructor(private questionSerive: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getALlQuestions();
  }

  getALlQuestions(){
    this.questionSerive.getQuestionsJson().subscribe(res =>{this.questionList= res.questions});
  }
  nextQuestion(){
this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQ: number , option: any){
    if(option.correct){
      this.point += 10;
      this.correctAnswer++;
      this.currentQuestion++;
    } else{
      this.point -= 10;
      this.incorrectAnswer++;
      this.currentQuestion++;
    }
  }
}
