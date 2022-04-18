//localStorage.clear()

// var myHour, myMinute, mySecond;

/* Quiz Controller*/ 
var quizController = (()=>{

    /* Question Constructor*/

    function Question(id,questionText,options, correctAnswer){

        this.id= id;
        this.questionText= questionText;
        this.options= options;
        this.correctAnswer= correctAnswer;
    };

    
    var questionLocalStorage = {

        setQuestionCollection: newCollection=>{
            localStorage.setItem('questionCollection', JSON.stringify(newCollection))
        },

        getQuestionCollection: ()=>{
            return JSON.parse(localStorage.getItem('questionCollection'))
        },
        removeQuestionCollection: ()=>{ 

            localStorage.removeItem("questionCollection");

        }
    };

    if (questionLocalStorage.getQuestionCollection()=== null) {

        questionLocalStorage.setQuestionCollection([]);
    };

    var quizprogress= {

        questionIndex: 0,
    };

    // PERSON CONSTRUCTOR

    function Person (id, firstName, lastName, score){

        this.id=id;
        this.firstName= firstName;
        this.lastName= lastName;
        this.score=score;

    };

    var currentPersonData={
        fullName:[],
        score:0,
    };

    var adminFullName= ["Rotimi", "Olumide"];

    var personLocalStorage= {

        setPersonData: newPersonData=>{
            localStorage.setItem("personData", JSON.stringify(newPersonData))
        },

        getPersonData: ()=>{
           return JSON.parse (localStorage.getItem("personData"))
        },

        removePersonData: ()=>{
            localStorage.removeItem("personData")
        }
    };

    if (personLocalStorage.getPersonData()=== null) {

        personLocalStorage.setPersonData([]);
    };

    var timeLocalStorage= {

        setQuizTime: timeOfQuiz=>{
            localStorage.setItem("time", JSON.stringify(timeOfQuiz))
        },

        getQuizTime: ()=>{
           return JSON.parse (localStorage.getItem("time"))
        },

        removeQuizTime: ()=>{
            localStorage.removeItem("time")
        }
    };


    return {

        getQuizProgress: quizprogress,

        getQuestionLocalStorage:questionLocalStorage,

        addQuestionOnLocalStorage:(newQuesText, optns)=>{

            var optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;

            if (questionLocalStorage.getQuestionCollection()=== null) {

                questionLocalStorage.setQuestionCollection([]);
            }
            
            optionsArr = []; isChecked= false;

            for (var index = 0; index < optns.length; index++) {
                
                if (optns[index].value !=="") {
                    
                    optionsArr.push(optns[index].value)
                }

                if (optns[index].parentNode.previousElementSibling.checked && optns[index].value !=="" ) {
                    
                    corrAns = optns[index].value;
                    isChecked= true;
                }
                
            }

            // [ {id:0 }]

            if (questionLocalStorage.getQuestionCollection().length > 0) {

                questionId= questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;

            }else{

                questionId= 0;
            }

            if (newQuesText.value !== "") {

                if (optionsArr.length > 1) {
                    
                    if (isChecked) {
                     
                        newQuestion= new Question(questionId,newQuesText.value, optionsArr, corrAns); 

                        getStoredQuests = questionLocalStorage.getQuestionCollection();

                        getStoredQuests.push(newQuestion);

                        questionLocalStorage.setQuestionCollection(getStoredQuests);

                        newQuesText.value= "";

                        for (let index = 0; index < optns.length; index++) {

                            optns[index].value= "";

                            optns[index].parentNode.previousElementSibling.checked= false;
                            
                        }

                        //console.log(questionLocalStorage.getQuestionCollection());

                        return true

                    }else{
                        alert("The correct answer is not checked or you checked one without a value");

                        return false;
                    }

                }else{
                    alert('Insert at least two options');

                    return false;
                }   

            }else{
                alert('Please, insert a question');

                return false;
            }
        },

        checkAnswer: ans=>{
            
            if (questionLocalStorage.getQuestionCollection()[quizprogress.questionIndex].correctAnswer === ans.innerHTML) {

                currentPersonData.score++;
                
                return true;
                

            }else{
                console.log('wrong');

                return false;
            }
        },

        isFinished: ()=>{

            return quizprogress.questionIndex + 1 === questionLocalStorage.getQuestionCollection().length;

        },

        addPerson: ()=>{

            var newPerson, personId, personData;

            if (personLocalStorage.getPersonData().length>0) {

                personId=personLocalStorage.getPersonData()[personLocalStorage.getPersonData().length-1].id +1;
                
            }else{
                personId=0;
            }

            newPerson= new Person(personId,currentPersonData.fullName[0],currentPersonData.fullName[1], currentPersonData.score);

            personData= personLocalStorage.getPersonData();

            personData.push(newPerson);

            personLocalStorage.setPersonData(personData);
        },

        getCurrentPersonData: currentPersonData,

        getAdminFullName:adminFullName,

        getPersonLocalStorage:personLocalStorage,

        getTimeLocalStorage:timeLocalStorage,
        
    };

})(); 


/* UI Controller*/

var UIcontroller =(()=>{

    var domItems= {

        /* Admin Panel Elements */

        adminPanel: document.getElementById("backEnd"),
        questionInsertButn: document.getElementById("questionInsertButton"),
        newQuestionText: document.getElementById("newQuestion"),
        adminOptions: document.querySelectorAll(".optionAnswer"),
        adminOptionsContainer: document.getElementById("option1").parentNode.parentNode,
        questionInsertButton: document.getElementById("questionInsertButton"),
        questionBank: document.getElementById("questionBank"),
        overallOptionContainer: document.getElementById("overallOptionContainer"),
        questUpdateBtn:questionInsertButton.parentNode.parentNode.firstElementChild,
        questDeleteBtn:questionInsertButton.parentNode.parentNode.firstElementChild.nextElementSibling,
        questnClearBtn:document.getElementById("questnClearBtn"),
        resultListWrapper: document.getElementById("resultBorad-body"),
        clearResultBtn: document.getElementById("clearResultBtn"),
        timeGlass:document.getElementById("timeGlass"),
        testTime:document.getElementById("testTime"),


        /* Quiz section Elements*/

        quizSection: document.getElementById("testPanel"),

        askedQuestionTest:document.getElementById("askedQuestionTest"),

        optionsWrapper:document.getElementById("optionsWrapper"),

        progressBar:document.querySelector("progress"),

        progressPar: document.getElementById("progress"),

        instantAnswerContainer:document.getElementById("markIndicator"),

        instantAnswerText:document.getElementById("instantAnswerText"),

        insAnsDiV: document.getElementById("marker"),

        emotionIcon: document.getElementById("emotion"),

        emotionsIcon1: document.getElementById("marker").previousElementSibling,

        emotionsIcon2: document.getElementById("marker").parentNode.firstElementChild,

        nextQuestnBtn: document.getElementById("markButton"),

        // Landing page Elements

        landingPage: document.getElementById("homePage"),

        startQuizBtn: document.getElementById("startQuizBtn"),

        firstNameInput: document.getElementById("firstName"),

        lastNameInput: document.getElementById("lastName"),

        //  final Result section

        finalResultSection: document.getElementById("resultSection"),

        finalScoreText: document.getElementById("finalScoreText"),

    }



    return {
        getDomItems: domItems,

        mySecond: 0,

        myMinute:quizController.getTimeLocalStorage.getQuizTime(),

        addInputsDynamically: ()=>{

            var addInput= ()=>{

                    var inputHTML, count, elementWithEvntListener;
    
                    count=document.querySelectorAll(".optionAnswer").length;

                    elementWithEvntListener= domItems.questionInsertButton.previousElementSibling.lastElementChild.lastElementChild.firstElementChild;
    
                    inputHTML=
                    '<div><input type="radio" id= "option'+ count +'" name="answers"><label for="option'+ count +'"><input type="text" class="optionAnswer"></label></div>';
    
                    domItems.overallOptionContainer.insertAdjacentHTML("beforeEnd",inputHTML);

                    elementWithEvntListener.removeEventListener('focus', addInput);

                    domItems.questionInsertButton.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.addEventListener('focus', addInput);
                    
            }

            domItems.questionInsertButton.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.addEventListener('focus',addInput)
        },

        createQuestionList: getQuestions=>{
            //console.log(getQuestions);

            var questHTML, numberingArr;

            numberingArr=[];

            domItems.questionBank.innerHTML= "";

            for (let index = 0; index < getQuestions.getQuestionCollection().length; index++) {

                numberingArr.push(index + 1);
                
                questHTML=' <div class="questionBankItem"><P class="questionList"> '+ numberingArr[index]+'.'+ getQuestions.getQuestionCollection()[index].questionText+'</P><button class="buttons editButton " id="question-'+ getQuestions.getQuestionCollection()[index].id +'">Edit</button></div>';

                questionBank.insertAdjacentHTML("afterbegin",questHTML);
                
            }
        },

        editQuestList: (event,storageQuestList, updateQuestnListFunc)=>{

            var getId, getStorageQuestList,foundItem,placeInArr, optionHTML;
            
            if ("question-".indexOf(event.target.id)) {

                getId= parseInt(event.target.id.split("-")[1]);
                
                getStorageQuestList= storageQuestList.getQuestionCollection();

                for (let index = 0; index < getStorageQuestList.length; index++) {
                    
                    if (getStorageQuestList[index].id=== getId) {
                        foundItem=getStorageQuestList[index];

                        placeInArr= index;
                    }
                    
                }

                domItems.newQuestionText.value= foundItem.questionText;

                domItems.overallOptionContainer.innerHTML="";

                optionHTML="";

                for (let i = 0; i < foundItem.options.length; i++) {

                   optionHTML +='<div><input type="radio" id="option'+ i +'" name="answers"><label for="option'+ i +'"><input type="text" class="optionAnswer" value="'+ foundItem.options[i]+'"></label></div>'                  
                }

                domItems.overallOptionContainer.innerHTML=optionHTML;

                domItems.questUpdateBtn.setAttribute("style","display:inline-block");

                domItems.questDeleteBtn.setAttribute("style","display:inline-block");

                domItems.questionInsertButn.style.visibility="collapse";

                domItems.questnClearBtn.style.pointerEvents="none";

                UIcontroller.addInputsDynamically();

                //console.log(foundItem.questionText);



                var backDefaultView= ()=>{

                    var updatedOptions;

                    domItems.newQuestionText.value= "";

                    updatedOptions=document.querySelectorAll(".optionAnswer");

                    for (let z = 0; z < updatedOptions.length; z++) {

                        updatedOptions[z].value="";
                        updatedOptions[z].parentNode.previousSibling.checked= false;                      
                    }

                    domItems.questUpdateBtn.setAttribute("style","display:none");

                    domItems.questDeleteBtn.setAttribute("style","display:none");

                    domItems.questionInsertButn.style.visibility="collapse";

                    domItems.questnClearBtn.style.pointerEvents="";

                    updateQuestnListFunc(storageQuestList);
                }



                var updateQuestion= ()=>{

                    var newOptions, optionElemnts;

                    newOptions= []

                    optionElemnts=document.querySelectorAll(".optionAnswer");
                    
                    foundItem.questionText=domItems.newQuestionText.value;

                    foundItem.correctAnswer="";

                    for (let x = 0; x < optionElemnts.length; x++) {

                        if (optionElemnts[x].value !== "") {

                            newOptions.push(optionElemnts[x].value);

                            if (optionElemnts[x].parentNode.previousSibling.checked) {
                                
                                foundItem.correctAnswer=optionElemnts[x].value;
                            }
                            
                        }
                                               
                    }

                    foundItem.options=newOptions;

                    if (foundItem.questionText !== "") {

                        if (foundItem.options.length>1) {

                            if (foundItem.correctAnswer !== "") {

                                getStorageQuestList.splice(placeInArr,1,foundItem);

                               storageQuestList.setQuestionCollection(getStorageQuestList);

                               backDefaultView();
                                
                            }else{

                                alert("The correct answer is not checked or you checked one without a value");        
                            }
                             
                        }else{
                            alert('Insert at least two options');
                        }
                       
                    }else{
                        alert("Please, insert the question");
                    }
                    //console.log(foundItem);
                }


                domItems.questUpdateBtn.onclick= updateQuestion;

                var deleteQuestion= ()=>{

                    getStorageQuestList.splice(placeInArr,1);

                    storageQuestList.setQuestionCollection(getStorageQuestList);

                    backDefaultView();
                }

                domItems.questDeleteBtn.onclick= deleteQuestion;
                
            }
        },

        clearQuestnList: storageQuestList =>{

            
            if (storageQuestList.getQuestionCollection() === null) {
             
                storageQuestList.setQuestionCollection([])
            }
            
           if (storageQuestList.getQuestionCollection().length > 0) {
                
                var conf= confirm("warning! You will lose entire question list");

                if (conf) {


                        storageQuestList.removeQuestionCollection();

                        domItems.questionBank.innerHTML="";
                    
                }

           }
        },

        displayQuestion: (storageQuestionList, progress)=>{

            var optionsHTML, characterArr;

            characterArr=["A", "B", "C", "D", "E", "F"];

            if (storageQuestionList.getQuestionCollection().length> 0) {
                
                domItems.askedQuestionTest.innerHTML= storageQuestionList.getQuestionCollection()[progress.questionIndex].questionText;

                domItems.optionsWrapper.innerHTML= "";

                optionsHTML= ""

                for (let index = 0; index < storageQuestionList.getQuestionCollection()[progress.questionIndex].options.length; index++) {


                    optionsHTML += '<div class="option-'+ index +' options"><span class="option-'+ index +'"><span class="option-'+ index +'">'+ characterArr[index] +'</span><i class="option-'+ index +' fas fa-caret-down"></i></span><p class="option-'+ index +' optionContent">' + storageQuestionList.getQuestionCollection()[progress.questionIndex].options[index]  +'</p></div>';
                    
                };


                domItems.optionsWrapper.innerHTML= optionsHTML;
            }

        },

        displayProgress:(storageQuestionList, progress)=>{

            domItems.progressBar.max=storageQuestionList.getQuestionCollection().length;

            domItems.progressBar.value= progress.questionIndex + 1;

            domItems.progressPar.innerHTML= `${(domItems.progressBar.value)}/${ domItems.progressBar.max}`;
            //console.log("it works")
        },

        newDesign: (ansResult, selectedAnswer)=>{

            var twoOptions, index, elementPara, textPara;

            index=0;

            if (ansResult) {

                index=1;

                domItems.emotionsIcon1.style.display="none";
                domItems.emotionsIcon2.style.display="inline";

            }

            if(!ansResult){

                domItems.emotionsIcon2.style.display="none";
                domItems.emotionsIcon1.style.display="inline";
            }

            twoOptions = {

                instAnswerText:["This is a wrong Answer", "This is the correct Answer"],
                instAnswerClass:["red","green"],
                optionSpanBg:["rgba(200,0,0,0.7)","rgba(0,250,0,0.2)"]

            };

            domItems.optionsWrapper.style.cssText="opacity:0.6;pointer-events:none;";

            domItems.instantAnswerContainer.style.display="flex";

            elementPara= document.createElement("p");

            textPara=document.createTextNode(twoOptions.instAnswerText[index]);

            elementPara.appendChild(textPara);

            domItems.instantAnswerText.insertBefore(elementPara,domItems.instantAnswerText.firstElementChild);

            domItems.instantAnswerText.className= twoOptions.instAnswerClass[index];

             selectedAnswer.previousElementSibling.firstElementChild.style.backgroundColor=twoOptions.optionSpanBg[index];
        },

        resetDesign: ()=>{

            domItems.optionsWrapper.style.cssText="";

            domItems.instantAnswerContainer.style.display="none";

        },

    

        getFullName: (currPerson, storageQuestnList, admin,userData, timeDisplay)=>{

            if (!(domItems.firstNameInput.value ==="" || domItems.lastNameInput.value==="")) {

                if (!(domItems.firstNameInput.value === admin[0] && domItems.lastNameInput.value === admin[1]) ) {

                    let checkNameList= userData.getPersonData().every(person=>{

                        return person.firstName !== domItems.firstNameInput.value  && person.lastName !== domItems.lastNameInput.value
                    } )

                    console.log(userData.getPersonData().length)

                    if (checkNameList) {

                        if ( storageQuestnList.getQuestionCollection().length> 0) {

                            currPerson.fullName.push(domItems.firstNameInput.value);
            
                            currPerson.fullName.push(domItems.lastNameInput.value);
                
                            domItems.landingPage.style.display="none";
                
                            domItems.quizSection.style.display="block";

                            setInterval(timeDisplay,1000);
                            
                        }else{
                            alert("Quiz not ready, please contact the Adminstrator.");
                        }
                        
                    }else{

                        alert("You have taken this test once. hence, you are not allowed to proceed")
                    }
                        
                }else{
        
                    domItems.landingPage.style.display="none";
        
                    domItems.adminPanel.style.display="block";
        
                }
                                 
            }else{

                alert("Please, enter your first and last names")
            }

        },

        finalResult: (currPerson)=>{

            domItems.finalScoreText.textContent= `${currPerson.fullName[0]} ${currPerson.fullName[1]}, your final score is ${currPerson.score}.`;

            domItems.quizSection.style.display="none";

            domItems.finalResultSection.style.display="block";
        },

        addResultOnPanel: userData=>{

            var resultHTML;

            domItems.resultListWrapper.innerHTML="";

            resultHTML=""

            for (let index = 0; index < userData.getPersonData().length; index++) {
                
                resultHTML += '<div class="questionBankItem person-'+ index +' "><P class="questionList person-'+ index +'"> ' + ' ' + userData.getPersonData()[index].firstName + ' ' + userData.getPersonData()[index].lastName + " - " + ' ' + userData.getPersonData()[index].score +' points</P><button class="buttons editButton" id="delete-result-btn_'+ userData.getPersonData()[index].id +'">Delete</button></div>'; 
            }

            domItems.resultListWrapper.innerHTML= resultHTML;

        },

        deleteResult:(event,userData)=>{

            var getId, personArr;

            personArr=userData.getPersonData();

            if ('delete-result-btn_'.indexOf(event.target.id)) {
                
                getId=parseInt(event.target.id.split("_")[1]);

                for (let index = 0; index < personArr.length; index++) {

                    
                    if (personArr[index].id === getId) {
                        
                        personArr.splice(index,1);

                        userData.setPersonData(personArr);

                        UIcontroller.addResultOnPanel(userData);
                    }
                }
            }

        },

        clearResults: userData=>{

            var personArr,conf;
            
            personArr= userData.getPersonData();

            if (personArr.length> 0) {

                conf= confirm("warning! You will lose entire result list");
            
                if (conf) {

                    domItems.resultListWrapper.innerHTML="";

                    personArr.splice(0,personArr.length);

                    userData.setPersonData(personArr);
                    
                } 
                
            }

        },

        timeCheck: function () {

            if (UIcontroller.myMinute !== null) {
        
        
                    UIcontroller.mySecond--

        
                    if (UIcontroller.mySecond == -1) {
                
                        UIcontroller.mySecond= 59
                        
                    }
                
                    if(UIcontroller.mySecond== 59){

                        if (UIcontroller.myMinute !=0) {

                            UIcontroller.myMinute --
                            
                        }else{

                            UIcontroller.mySecond=0
                        }
                
                    }
                    
                
            }

            UIcontroller.myMinute=String(UIcontroller.myMinute);

            mySeconds=String(UIcontroller.mySecond);

            console.log(typeof(UIcontroller.myMinute),typeof(mySeconds))

            if (UIcontroller.myMinute.length<2 && mySeconds.length >1 ) {

                domItems.timeGlass.innerHTML=`0${UIcontroller.myMinute}:${mySeconds}`
                
            }else if (UIcontroller.myMinute.length>1 && mySeconds.length <2) {

                domItems.timeGlass.innerHTML=`${UIcontroller.myMinute}:0${mySeconds}`

            }else if(UIcontroller.myMinute.length<2 && mySeconds.length <2) {

                domItems.timeGlass.innerHTML=`0${UIcontroller.myMinute}:0${mySeconds}`
            }
            else{

                domItems.timeGlass.innerHTML=`${UIcontroller.myMinute}:${mySeconds}`

            }

            if (domItems.timeGlass.innerHTML== `00:00`) {

                
                domItems.quizSection.style.display="none";

                domItems.finalResultSection.style.display="block";
                
            }
        },
        

    };

})();

/* Controller*/



var controller=((quizCont, UIcont)=>{

    var selectDomItems = UIcont.getDomItems;

    UIcont.addInputsDynamically();

    UIcont.createQuestionList(quizCont.getQuestionLocalStorage);

    selectDomItems.questionInsertButn.addEventListener("click",()=> { var adminOptions= document.querySelectorAll(".optionAnswer"); var checkBoolean=quizCont.addQuestionOnLocalStorage(selectDomItems.newQuestionText,adminOptions); 
    if (checkBoolean) {
        UIcont.createQuestionList(quizCont.getQuestionLocalStorage);
    }});

    selectDomItems.questionBank.addEventListener('click', e=>{
        UIcont.editQuestList(e, quizCont.getQuestionLocalStorage,UIcont.createQuestionList)
    });

    selectDomItems.questnClearBtn.addEventListener("click",()=>{
        UIcont.clearQuestnList(quizCont.getQuestionLocalStorage)
    })

    UIcont.displayQuestion(quizCont.getQuestionLocalStorage, quizCont.getQuizProgress);

    UIcont.displayProgress(quizCont.getQuestionLocalStorage,quizCont.getQuizProgress);

    selectDomItems.optionsWrapper.addEventListener("click",(e)=>{
        
        var updatedOptionsdiv= selectDomItems.optionsWrapper.querySelectorAll("div");

        for (let index = 0; index < updatedOptionsdiv.length; index++) {
            
            if (e.target.classList.contains(`option-${index}`)) {
                
                var answer= document.querySelectorAll(`.optionContent`)[index];

                var answerResult=quizCont.checkAnswer(answer);

                UIcont.newDesign(answerResult,answer);

                if (quizCont.isFinished()) {

                    selectDomItems.nextQuestnBtn.textContent="Finish"
                }

                var nextQuestion= (questnData, progress)=>{


                    if (quizCont.isFinished()) {
                       
                        // finish Quiz
                        quizCont.addPerson()

                        UIcont.finalResult(quizCont.getCurrentPersonData);

                    }else{
                        
                        UIcont.resetDesign();

                        quizCont.getQuizProgress.questionIndex ++;

                        UIcont.displayQuestion(quizCont.getQuestionLocalStorage, quizCont.getQuizProgress);

                        UIcont.displayProgress(quizCont.getQuestionLocalStorage,quizCont.getQuizProgress);

                    }

                }

            }
            
        };

        selectDomItems.nextQuestnBtn.onclick= ()=>{

            selectDomItems.instantAnswerText.removeChild(selectDomItems.instantAnswerText.firstElementChild);
    
            nextQuestion(quizCont.getQuestionLocalStorage, quizCont.getQuizProgress);
        };

      
    });
    
    selectDomItems.startQuizBtn.addEventListener("click",()=>{


        UIcont.getFullName(quizCont.getCurrentPersonData,quizCont.getQuestionLocalStorage, quizCont.getAdminFullName,quizCont.getPersonLocalStorage, UIcont.timeCheck);
    });

    selectDomItems.lastNameInput.addEventListener("focus",()=>{

        selectDomItems.lastNameInput.addEventListener("keypress", (e)=>{

            if (e.keyCode === 13) {
                
                UIcont.getFullName(quizCont.getCurrentPersonData,quizCont.getQuestionLocalStorage, quizCont.getAdminFullName);
            }
        })
    });

    UIcont.addResultOnPanel(quizCont.getPersonLocalStorage);

    document.querySelector("h1").addEventListener("click",function(){

        var a=  ()=>{

            console.log(this)
        }

        a();
    })

    selectDomItems.resultListWrapper.addEventListener('click',e=>{
        UIcont.deleteResult(e, quizCont.getPersonLocalStorage);
    });

    selectDomItems.clearResultBtn.addEventListener('click',()=>{

        UIcont.clearResults(quizCont.getPersonLocalStorage);

    });

    selectDomItems.testTime.addEventListener("input", e=>{

        quizCont.getTimeLocalStorage.setQuizTime(e.target.value);
             
    });
    //console.log(UIcont.myMinute)
       
})(quizController,UIcontroller);


confirm