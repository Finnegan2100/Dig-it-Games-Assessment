(function() {

    var canvas = document.getElementById("myCanvas"),
        context = canvas.getContext("2d"),
        
        GAMESTATE = "MAIN_MENU",
        
        titleColor = "#0B9CE5",
        titleColorEnd1 = "#0B9CE5",
        titleColorEnd2 = "#0B9CE5",
        
        overStartButton = false,
        overMainMenuButton = false,
        overNewGameButton = false,
        
        numbers = [],
        correctSums = [],
        playerAnswers = [],
        equationNumber = 1;
    
    window.addEventListener("mousemove",function onMouseMove(evt) {
        
        var x = evt.x;
        var y = evt.y;

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        console.log(x,y);
        
        if (GAMESTATE === "MAIN_MENU") {
        
            if (evt.x > 228 && evt.x < 362) {
                if (evt.y > 414 && evt.y < 464) {
                    titleColor = "#f00";
                    overStartButton = true;
                    render();
                } else {
                    titleColor = "#0B9CE5";
                    overStartButton = false;
                    render(); 
                }
            } else {
                titleColor = "#0B9CE5";
                overStartButton = false;
                render(); 
            }
        }
        
         if (GAMESTATE === "END_OF_GAME_SCREEN") {
        
            if (evt.x > 40 && evt.x < 180) {
                if (evt.y > 440 && evt.y < 500) {
                    titleColorEnd1 = "#f00";
                    render();
                } else {
                    titleColorEnd1 = "#0B9CE5";
                    render(); 
                }
            } else {
                titleColorEnd1 = "#0B9CE5";
                render(); 
            }
             
             
             if (evt.x > 410 && evt.x < 550) {
                if (evt.y > 440 && evt.y < 500) {
                    titleColorEnd2 = "#f00";
                    render();
                } else {
                    titleColorEnd2 = "#0B9CE5";
                    render(); 
                }
            } else {
                titleColorEnd2 = "#0B9CE5";
                render(); 
            } 
        }
    });
    
    window.addEventListener("click",function onClick(evt) {
        
        var x = evt.x;
        var y = evt.y;

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        if (overStartButton) {
            GAMESTATE = "EQUATION_SCREEN";
            render();
        }  
    })
    
    function generateRandomNumbers(total) {
        
        for (var i = 0; i < total; i++) {

            var numDigits = 1 + Math.ceil(Math.random() * 4);
            var result;

            switch (numDigits) {

                case 2: 
                result = 10 + Math.ceil(Math.random() * 89);
                break;

                case 3: 
                result = 100 + Math.ceil(Math.random() * 899);
                break;

                case 4: 
                result = 1000 + Math.ceil(Math.random() *8999);
                break;

                case 5: 
                result = 10000 + Math.ceil(Math.random() *89999);
                break;    
            }
                numbers.push(result);  
                correctSums = [numbers[0] + numbers[1], numbers[2] + numbers[3],
                               numbers[4] + numbers[5], numbers[6] + numbers[7],
                               numbers[8] + numbers[9]];
        }
    }
    
    generateRandomNumbers(10);
    render();
      
    function render() {
        
        context.clearRect(0,0,canvas.width,canvas.height);
        switch(GAMESTATE) {
                
            case "MAIN_MENU":
                
            context.font = "38pt Verdana";
            context.fillStyle = "#fff";
            context.fillText("ADDITION GAME",70,200);
             
            context.fillStyle = "#fff";    
            context.fillRect(160,400,250,80);
                
            context.font = "38pt Verdana";
            context.fillStyle = titleColor;
            context.fillText("PLAY!",220,460);    
            break;
                
            case "EQUATION_SCREEN":
                
            context.font = "22pt Verdana";
            context.fillStyle = "#fff";
            context.fillText("FIND THE SUM OF THE TWO NUMBERS",10,100);
                
            context.fillStyle = "#eee";    
            context.fillRect(50,190,200,100);
                
            context.font = "44pt Verdana";    
            context.fillStyle = "#fff";
            context.fillText("+",267,265);    
                
            context.fillStyle = "#eee";    
            context.fillRect(330,190,200,100); 
            
            context.font = "30pt Verdana";      
            context.fillStyle = "#ffb800"; 
                
            switch (equationNumber) {
              
                    
                case 1: 
                context.fillText(numbers[0],100,260);
                context.fillText(numbers[1],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);    
                break; 
                    
                case 2: 
                context.fillText(numbers[2],100,260);
                context.fillText(numbers[3],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);      
                break; 
                    
                case 3: 
                context.fillText(numbers[4],100,260);
                context.fillText(numbers[5],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);      
                break; 
                    
                case 4: 
                context.fillText(numbers[6],100,260);
                context.fillText(numbers[7],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);      
                break;  
                    
                case 5: 
                context.fillText(numbers[8],100,260);
                context.fillText(numbers[9],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);      
                break;         
            }
            drawSelectableNumbers(10);       
            break;
                
            case "END_OF_GAME_SCREEN":
            
                
            context.font = "36pt Verdana";    
            context.fillStyle = "#fff"; 
            context.fillText("RESULTS",200,65);     
                
            context.font = "22pt Verdana";    
            context.fillStyle = "#fff";
                
            context.fillText(numbers[0] + " + " + numbers[1],5,165); 
            context.fillText(correctSums[0],475,165);
                
            context.fillText(numbers[2] + " + " + numbers[3],5,235); 
            context.fillText(correctSums[1],475,235); 
                
            context.fillText(numbers[4] + " + " + numbers[5],5,305); 
            context.fillText(correctSums[2],475,305);
                
            context.fillText(numbers[6] + " + " + numbers[7],5,375); 
            context.fillText(correctSums[3],475,375);   
            
            context.fillText(numbers[8] + " + " + numbers[9],5,445); 
            context.fillText(correctSums[4],475,445);
                
            context.fillStyle = "#fff";    
            context.fillRect(30,500,160,80);
                
            context.fillStyle = "#fff";    
            context.fillRect(410,500,160,80);    
                
            context.font = "18pt Verdana";
            context.fillStyle = titleColorEnd1;
            context.fillText("NEW GAME",40,550);
            context.fillStyle = titleColorEnd2;    
            context.fillText("MAIN MENU",420,550);    
            break;    
                
                
             
                
                function drawAnswerBoxes(len) {

                    var startingPoint;
                    
                    for (var i = 0; i < len; i++) {

                        if (len === 2) {
                            startingPoint = 220;  
                        } else if (len === 3) {
                            startingPoint = 190;
                        } else if (len === 4) {
                            startingPoint = 150;
                        }  else if (len === 5) {
                            startingPoint = 100;   
                        } else {
                            startingPoint = 60;   
                        }
                        context.fillStyle = "#eee";
                        context.fillRect(startingPoint + i * 80,360,50,50);    
                    }   
                }
                
                function drawSelectableNumbers(num) {
                 
                    for (var i = 0; i < num; i++) {
                        context.fillStyle = "#eee";
                        context.fillRect(20 + i * 57,500,50,50);
                        context.fillStyle = "#ffb800";
                        context.font = "20pt Verdana";
                        context.fillText(i.toString(),35 + i * 57,535);
                    }
                }
            }   
        }
        
})();