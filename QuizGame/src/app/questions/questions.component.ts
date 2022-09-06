import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
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
counter: number= 15;
progress: string = "0";
//progress2: string = "0";
//progress3: string = "0";
interval$: any;
isQuizCompleted: boolean = false;


  constructor(private questionSerive: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getALlQuestions();
    this.startCounter();
  }

  getALlQuestions(): void{
    this.questionSerive.getQuestionsJson().subscribe(res =>{this.questionList= res.questions});
  }
  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQ: number , option: any){
if(this.currentQuestion === this.questionList.length){
  this.isQuizCompleted = true;
  this.stopCounter();
}

    if(option.correct){
      this.point += 10;
      setTimeout(() => {
        this.correctAnswer++;
        this.currentQuestion++;
        this.getProgressPercent();
      }, 500);
    } else{
      this.point -= 10;
      setTimeout(() => {
        this.incorrectAnswer++;
      this.currentQuestion++;
      this.getProgressPercent();
      }, 500);
     
    }
   
  }

  startCounter(){
  this.interval$ = interval(1000).subscribe(val =>{ this.counter--;
    if(this.counter == 0){
      this.currentQuestion++;
      this.counter=15;
      this.point -= 10;
    }
  });
setTimeout(() =>{this.interval$.unsubscribe()}, 350000);
  }
  stopCounter(){
this,this.interval$.unsubscribe();
this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 15;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getALlQuestions();
    this.point = 0;
    this.currentQuestion = 0;
    this.progress = "0";
  }
  percent: number=0 ;
  getProgressPercent(){
    this.progress = ( (this.currentQuestion/this.questionList.length) * 100).toString();
    return this.progress;

 /*   this.percent=  (this.currentQuestion/this.questionList.length) * 100;
   

    if(this.percent <= 30){
      this.progress = this.percent.toString();
      return this.progress;
    } else if(this.percent > 30 && this.percent <= 60){
      this.progress2 = this.percent.toString();
      return this.progress2;
    } else{
      this.progress2 = this.percent.toString();
      return this.progress3;
    }*/

    
  }
}
