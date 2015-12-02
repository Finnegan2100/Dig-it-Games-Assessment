(function() {

    var canvas = document.getElementById("myCanvas"),
        context = canvas.getContext("2d");
    
    
    var newGameWidth, newGameHeight;


    var game = {
            element: document.getElementById("myCanvas"),
            width: 650,
            height: 650,
            safeWidth: 700,
            safeHeight: 700

        },

        resizeGame = function () {

            var viewport, newGameX, newGameY;

            viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            if (game.height / game.width > viewport.height / viewport.width) {
                if (game.safeHeight / game.width > viewport.height / viewport.width) {
  
                    newGameHeight = viewport.height * game.height / game.safeHeight;
                    newGameWidth = newGameHeight * game.width / game.height;
                } else {

                    newGameWidth = viewport.width;
                    newGameHeight = newGameWidth * game.height / game.width;
                }
            } else {
                if (game.height / game.safeWidth > viewport.height / viewport.width) {
   
                    newGameHeight = viewport.height;
                    newGameWidth = newGameHeight * game.width / game.height;
                } else {

                    newGameWidth = viewport.width * game.width / game.safeWidth;
                    newGameHeight = newGameWidth * game.height / game.width;
                }
            }

            game.element.style.width = newGameWidth + "px";
            game.element.style.height = newGameHeight + "px";

            newGameX = (viewport.width - newGameWidth) / 2;
            newGameY = (viewport.height - newGameHeight) / 2;


            // Set the new padding of the game so it will be centered
            game.element.style.marginLeft = newGameY + "px " + newGameX + "px";
            game.element.style.marginBottom = newGameY + "px " + newGameX + "px";
        };

    window.addEventListener("resize", resizeGame);
    resizeGame();

    var ratio = game.width / game.height;
        
    var GAMESTATE = "MAIN_MENU",
        
        titleColor = "#0B9CE5",
        titleColorEnd1 = "#0B9CE5",
        titleColorEnd2 = "#0B9CE5",
                
        overStartButton,
        overMainMenuButton,
        overNewGameButton,
        
        overNumberButtons = [false,false,false,false,false,false,false,false,false,false],
        canMoveNumberButtons = [false,false,false,false,false,false,false,false,false,false],
        numberButtonXCoords = [],
        answerSpaceCoords = [],
        currentBoxIndex,
        carryingNumber = false,
        
        numbers = [],
        correctSums = [],
        playerAnswersX = [],
        playerAnswersValue = [],
        playerAnswersFinal = [],
        finalDigits = [],
        currentTurn = 1,
        
        Mouse = {},
        Touch = {};
  

    window.addEventListener("mousemove",function onMouseMove(evt) {
        
        Mouse.x = evt.x;
        Mouse.y = evt.y;

        Mouse.x -= canvas.offsetLeft;
        Mouse.y -= canvas.offsetTop;
        
        Mouse.x *= (game.width / newGameWidth) / 1.1;
        Mouse.y *= (game.height / newGameHeight) / 1.1;
        
        console.log(Mouse.x,Mouse.y);
        
        Touch.x = undefined;
        Touch.y = undefined;
            
        if (GAMESTATE === "MAIN_MENU") {
        
            if (Mouse.x > 228 && Mouse.x < 362) {
                if (Mouse.y > 414 && Mouse.y < 464) {
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
        
            if (Mouse.x > 40 && Mouse.x < 180) {
                if (Mouse.y > 500 && Mouse.y < 570) {
                    titleColorEnd1 = "#f00";
                    overNewGameButton = true;
                    render();
                } else {
                    titleColorEnd1 = "#0B9CE5";
                    overNewGameButton = false;
                    render(); 
                }
            } else {
                titleColorEnd1 = "#0B9CE5";
                overNewGameButton = false;
                render(); 
            }
             
             
             if (Mouse.x > 410 && Mouse.x < 550) {
                if (Mouse.y > 500 && Mouse.y < 570) {
                    titleColorEnd2 = "#f00";
                    overMainMenuButton = true;
                    render();
                } else {
                    titleColorEnd2 = "#0B9CE5";
                    overMainMenuButton = false;
                    render(); 
                }
            } else {
                titleColorEnd2 = "#0B9CE5";
                overMainMenuButton = false;
                render(); 
            } 
        }
    });
 
    window.addEventListener("touchmove",function onTouchMove(evt) {
        
        Touch.x = evt.targetTouches[0].pageX - canvas.offsetLeft;
        Touch.y = evt.targetTouches[0].pageY - canvas.offsetTop;
        evt.preventDefault();
        
        Touch.x *= (game.width / newGameWidth) / 1.1;
        Touch.y *= (game.height / newGameHeight) / 1.1;
        
        Mouse.x = undefined;
        Mouse.y = undefined;
        
            
        if (GAMESTATE === "MAIN_MENU") {
        
            if (Touch.x > 228 && Touch.x < 362) {
                if (Touch.y > 414 && Touch.y < 464) {
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
        
         if (overStartButton) {
            GAMESTATE = "EQUATION_SCREEN";
            render();
        }  
        if (overMainMenuButton) {
            GAMESTATE = "MAIN_MENU";
            resetGame();
        }
        if (overNewGameButton) {
            GAMESTATE = "EQUATION_SCREEN";
            resetGame();
        }
        

         if (GAMESTATE === "END_OF_GAME_SCREEN") {
        
            if (Touch.x > 40 && Touch.x < 180) {
                if (Touch.y > 500 && Touch.y < 570) {
                    titleColorEnd1 = "#f00";
                    overNewGameButton = true;
                    render();
                } else {
                    titleColorEnd1 = "#0B9CE5";
                    overNewGameButton = false;
                    render(); 
                }
            } else {
                titleColorEnd1 = "#0B9CE5";
                overNewGameButton = false;
                render(); 
            }
             
             
             if (Touch.x > 410 && Touch.x < 550) {
                if (Touch.y > 500 && Touch.y < 570) {
                    titleColorEnd2 = "#f00";
                    overMainMenuButton = true;
                    render();
                } else {
                    titleColorEnd2 = "#0B9CE5";
                    overMainMenuButton = false;
                    render(); 
                }
            } else {
                titleColorEnd2 = "#0B9CE5";
                overMainMenuButton = false;
                render(); 
            } 
        }
    });
 
    window.addEventListener("mousedown",function onMouseDown(evt) {
        
        var x = evt.x;
        var y = evt.y;
 
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        x *= (game.width / newGameWidth) / 1.1;
        y *= (game.height / newGameHeight) / 1.1;
        
        if (overStartButton) {
            GAMESTATE = "EQUATION_SCREEN";
            render();
        }  
        if (overMainMenuButton) {
            GAMESTATE = "MAIN_MENU";
            resetGame();
        }
        if (overNewGameButton) {
            GAMESTATE = "EQUATION_SCREEN";
            resetGame();
        }
        
        if (GAMESTATE === "EQUATION_SCREEN") {   
             
             for (var i = 0; i < 10; i++) {
                 
                 if (Mouse.x > numberButtonXCoords[i] && Mouse.x < numberButtonXCoords[i] + 50) {
                     if (Mouse.y > 490 && Mouse.y < 550) {
                         overNumberButtons[i] = true;
                         currentBoxIndex = i;
                     } else {
                         overNumberButtons[i] = false;
                 }   
             } else {
                     overNumberButtons[i] = false;
                }  
            }
         }
    });
    
       window.addEventListener("touchend",function onTouchEnd(evt) {
        
       Touch.x = evt.targetTouches[0].pageX - canvas.offsetLeft;
       Touch.y = evt.targetTouches[0].pageY - canvas.offsetTop;
       evt.preventDefault();
         
        Touch.x *= (game.width / newGameWidth) / 1.1;
        Touch.y *= (game.height / newGameHeight) / 1.1; 
        
        /*   
        if (overStartButton) {
            GAMESTATE = "EQUATION_SCREEN";
            render();
        }  
        if (overMainMenuButton) {
            GAMESTATE = "MAIN_MENU";
            resetGame();
        }
        if (overNewGameButton) {
            GAMESTATE = "EQUATION_SCREEN";
            resetGame();
        }
        */
        
    });
    
     window.addEventListener("touchstart",function onTouchStart(evt) {
        
       Touch.x = evt.targetTouches[0].pageX - canvas.offsetLeft;
       Touch.y = evt.targetTouches[0].pageY - canvas.offsetTop;
       evt.preventDefault();
         
        Touch.x *= (game.width / newGameWidth) / 1.1;
        Touch.y *= (game.height / newGameHeight) / 1.1; 
        
        
        
        if (GAMESTATE === "EQUATION_SCREEN") {   
             
             for (var i = 0; i < 10; i++) {
                 
                 if (Touch.x > numberButtonXCoords[i] && Touch.x < numberButtonXCoords[i] + 50) {
                     if (Touch.y > 490 && Touch.y < 550) {
                         overNumberButtons[i] = true;
                         currentBoxIndex = i;
                     } else {
                         overNumberButtons[i] = false;
                 }   
             } else {
                     overNumberButtons[i] = false;
                }  
            }
         }
    });
    
    window.addEventListener("mouseup",function onMouseUp(evt) {
        
        
        overNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        canMoveNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        
        carryingNumber = false;
  
    });
    
    window.addEventListener("touchend",function onTouchEnd(evt) {
        
        
        overNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        canMoveNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        
        carryingNumber = false;
  
    });
    
    function switchEquation() {
        
        playerAnswersX = [];
        playerAnswersValue = [];
        playerAnswersFinal = [];
        overNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        canMoveNumberButtons = [false,false,false,false,false,false,false,false,false,false];
        currentBoxIndex = [];
        carryingNumber = false;        
        currentTurn++;
    }
    
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
    update();
    
    function update() {
        
        render();
        window.setTimeout(update,30);          
    }
          
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
             if (currentTurn % 2 !== 0) {     
                context.fillRect(50,190,200,100);
             } else {
                context.fillRect(200,130,200,100);     
             }
                
            context.font = "44pt Verdana";    
            context.fillStyle = "#fff";
                
            if (currentTurn % 2 !== 0) {    
                context.fillText("+",267,265);  
            } else {
                context.fillText("+",140,265);  
            }
                
            context.fillStyle = "#eee";  
             if (currentTurn % 2 !== 0) {       
                context.fillRect(330,190,200,100);
             } else {
                context.fillRect(200,240,200,100); 
             }
            
            context.font = "30pt Verdana";      
            context.fillStyle = "#ffb800"; 
                
            switch (currentTurn) {
                    
                case 1: 
                context.fillText(numbers[0],100,260);
                context.fillText(numbers[1],370,260);
                drawAnswerBoxes(correctSums[0].toString().length);    
                break; 
                    
                case 2: 
                context.fillText(numbers[2],240,200);
                context.fillText(numbers[3],240,320);
                drawAnswerBoxes(correctSums[1].toString().length);      
                break; 
                    
                case 3: 
                context.fillText(numbers[4],100,260);
                context.fillText(numbers[5],370,260);
                drawAnswerBoxes(correctSums[2].toString().length);      
                break; 
                    
                case 4: 
                context.fillText(numbers[6],240,200);
                context.fillText(numbers[7],240,320);
                drawAnswerBoxes(correctSums[3].toString().length);      
                break;  
                    
                case 5: 
                context.fillText(numbers[8],100,260);
                context.fillText(numbers[9],370,260);
                drawAnswerBoxes(correctSums[4].toString().length);      
                break;         
            }
                
            for (i = 0; i < playerAnswersX.length; i++) {
                context.fillStyle = "#eee";
                context.fillRect(playerAnswersX[i],360,50,50); 
                context.fillStyle = "#ffb800";
                context.font = "20pt Verdana";
                context.fillText(playerAnswersValue[i],playerAnswersX[i] + 15,395);
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
            
              if (finalDigits[0] === correctSums[0]) {
                context.fillStyle = "#00ff00"; 
                context.fillText(finalDigits[0],280,165);   
              } else {
                context.fillStyle = "#ff3500";
                context.fillText(finalDigits[0],280,165); 
                context.fillStyle = "#00ff00";  
                context.fillText(correctSums[0],475,165);
              }   
                
            context.fillStyle = "#fff";
            context.fillText(numbers[2] + " + " + numbers[3],5,235); 
                
              if (finalDigits[1] === correctSums[1]) {
                context.fillStyle = "#00ff00";
                context.fillText(finalDigits[1],280,235);   
              } else {
                context.fillStyle = "#ff3500";
                context.fillText(finalDigits[1],280,235);  
                context.fillStyle = "#00ff00";  
                context.fillText(correctSums[1],475,235);
              }            
                
             context.fillStyle = "#fff";
             context.fillText(numbers[4] + " + " + numbers[5],5,305);     
            
            if (finalDigits[2] === correctSums[2]) {
                context.fillStyle = "#00ff00"; 
                context.fillText(finalDigits[2],280,305);   
              } else {
                context.fillStyle = "#ff3500";
                context.fillText(finalDigits[2],280,305); 
                context.fillStyle = "#00ff00";  
                context.fillText(correctSums[2],475,305);
              }   
                
            context.fillStyle = "#fff";
            context.fillText(numbers[6] + " + " + numbers[7],5,375);     
    
            if (finalDigits[3] === correctSums[3]) {
                context.fillStyle = "#00eb66"; 
                 context.fillText(finalDigits[3],280,375);    
              } else {
                context.fillStyle = "#ff3500";
                context.fillText(finalDigits[3],280,375); 
                context.fillStyle = "#00ff00";  
                context.fillText(correctSums[3],475,375);
              }  
                 
            context.fillStyle = "#fff";
            context.fillText(numbers[8] + " + " + numbers[9],5,445);
            
            if (finalDigits[4] === correctSums[4]) {
                context.fillStyle = "#00ff00";
                context.fillText(finalDigits[4],280,445);     
              } else {
                context.fillStyle = "#ff3500";
                context.fillText(finalDigits[4],280,445);
                context.fillStyle = "#00ff00";  
                context.fillText(correctSums[4],475,445);
              }      
  
                
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
                        context.fillStyle = "#ccc";
                        context.fillRect(startingPoint + i * 80,360,50,50); 
   
                            if (carryingNumber) {
                                
                                if (Touch.x === undefined) {  //IF PLAYER IS USING MOUSE CONTROLS
                        
                                    if (Math.abs(Mouse.x - startingPoint) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {

                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 20,395);

                                            playerAnswersX.push(startingPoint);
                                            playerAnswersValue.push(currentBoxIndex.toString());
                                            playerAnswersFinal[0] = currentBoxIndex;
   
                                            if (playerAnswersFinal.length === len && 
                                                playerAnswersFinal[0] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                            break;

                                    }
                                    if (Math.abs(Mouse.x - (startingPoint + 80)) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {
                                             context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 80,360,50,50); 
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 100,395);
                                             playerAnswersX.push(startingPoint + 80);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[1] = currentBoxIndex;
                            
                                             if (playerAnswersFinal.length === len
                                                && playerAnswersFinal[0] !== undefined
                                                && playerAnswersFinal[1] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                    if (Math.abs(Mouse.x - (startingPoint + 160)) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {
                                             context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 160,360,50,50);
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 180,395);
                                             playerAnswersX.push(startingPoint + 160);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[2] = currentBoxIndex;
                     
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                    if (Math.abs(Mouse.x - (startingPoint + 240)) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {
                                         context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 240,360,50,50);
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 260,395);
                                             playerAnswersX.push(startingPoint + 240);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[3] = currentBoxIndex;
                   
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                     if (Math.abs(Mouse.x - (startingPoint + 320)) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {
                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 320,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 340,395);
                                             playerAnswersX.push(startingPoint + 320);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[4] = currentBoxIndex;
                       
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined
                                               && playerAnswersFinal[4] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                       if (Math.abs(Mouse.x - (startingPoint + 400)) < 40 && 
                                        Math.abs(Mouse.y - 360) < 40) {
                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 400,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 420,395);
                                             playerAnswersX.push(startingPoint + 400);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[5] = currentBoxIndex;
                  
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined
                                               && playerAnswersFinal[4] !== undefined
                                               && playerAnswersFinal[5] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;
                                    }
                                }
                                
                                if (Mouse.x === undefined) {  //IF PLAYER IS USING TOUCH CONTROLS
                        
                                    if (Math.abs(Touch.x - startingPoint) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {

                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 20,395);

                                            playerAnswersX.push(startingPoint);
                                            playerAnswersValue.push(currentBoxIndex.toString());
                                            playerAnswersFinal[0] = currentBoxIndex;
                 
                                            if (playerAnswersFinal.length === len && 
                                                playerAnswersFinal[0] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                            break;

                                    }
                                    if (Math.abs(Touch.x - (startingPoint + 80)) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {
                                             context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 80,360,50,50); 
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 100,395);
                                             playerAnswersX.push(startingPoint + 80);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[1] = currentBoxIndex;
            
                                             if (playerAnswersFinal.length === len
                                                && playerAnswersFinal[0] !== undefined
                                                && playerAnswersFinal[1] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                    if (Math.abs(Touch.x - (startingPoint + 160)) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {
                                             context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 160,360,50,50);
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 180,395);
                                             playerAnswersX.push(startingPoint + 160);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[2] = currentBoxIndex;

                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                    if (Math.abs(Touch.x - (startingPoint + 240)) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {
                                         context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 240,360,50,50);
                                           context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 260,395);
                                             playerAnswersX.push(startingPoint + 240);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[3] = currentBoxIndex;
                                         
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                     if (Math.abs(Touch.x - (startingPoint + 320)) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {
                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 320,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 340,395);
                                             playerAnswersX.push(startingPoint + 320);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[4] = currentBoxIndex;
                                     
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined
                                               && playerAnswersFinal[4] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;

                                    }
                                       if (Math.abs(Touch.x - (startingPoint + 400)) < 40 && 
                                        Math.abs(Touch.y - 360) < 40) {
                                            context.fillStyle = "#eee";
                                            context.fillRect(startingPoint + 400,360,50,50);
                                            context.fillStyle = "#ffb800";
                                            context.font = "20pt Verdana";
                                            context.fillText(currentBoxIndex.toString(),
                                                             startingPoint + 420,395);
                                             playerAnswersX.push(startingPoint + 400);
                                             playerAnswersValue.push(currentBoxIndex.toString());
                                             playerAnswersFinal[5] = currentBoxIndex;
                                         
                                            if (playerAnswersFinal.length === len
                                               && playerAnswersFinal[0] !== undefined
                                               && playerAnswersFinal[1] !== undefined
                                               && playerAnswersFinal[2] !== undefined
                                               && playerAnswersFinal[3] !== undefined
                                               && playerAnswersFinal[4] !== undefined
                                               && playerAnswersFinal[5] !== undefined) {
                                                evaluateAnswer();  
                                             }
                                             break;
                                    }
                                }
                                
                            }
                    }   
                }
                
                function drawSelectableNumbers(num) {
                    
                    var x,
                        y = 500,
                        w = 50,
                        h = 50;
                    
                    for (var i = 0; i < num; i++) {
    
                        context.fillStyle = "#eee";
                        x = 20 + i * 57;
                        numberButtonXCoords.push(x);
                        
                        if (Mouse.x !== undefined) {
                     
                            if (i === currentBoxIndex && Mouse.y < 540 && Mouse.y > 300 &&
                                overNumberButtons[i] === true) {

                                carryingNumber = true;
                                context.fillRect(Mouse.x - 15,Mouse.y - 15,w,h);
                                context.fillStyle = "#ffb800";
                                context.font = "20pt Verdana";
                                context.fillText(i.toString(),Mouse.x,Mouse.y + 20);
                            } else {
                                context.fillRect(x,y,w,h);
                                context.fillStyle = "#ffb800";
                                context.font = "20pt Verdana";
                                context.fillText(i.toString(),35 + i * 57,y + 35);
                            }
                        }
                        
                        if (Touch.x !== undefined) {
                        
                            if (i === currentBoxIndex && Touch.y < 540 && Touch.y > 300 &&
                                overNumberButtons[i] === true) {

                                carryingNumber = true;
                                context.fillRect(Touch.x - 15,Touch.y - 15,w,h);
                                context.fillStyle = "#ffb800";
                                context.font = "20pt Verdana";
                                context.fillText(i.toString(),Touch.x,Touch.y + 20);
                            } else {
                                context.fillRect(x,y,w,h);
                                context.fillStyle = "#ffb800";
                                context.font = "20pt Verdana";
                                context.fillText(i.toString(),35 + i * 57,y + 35);
                            }    
                        }
                    }
                }
            }   
        }
    
        function evaluateAnswer() {
            
            var x = parseInt(playerAnswersFinal.join(""));
          
            switch (currentTurn) {
            
                case 1:
                    
                finalDigits.push(x); 
                switchEquation();    
                break;
                    
                case 2:
                    
                finalDigits.push(x); 
                switchEquation();      
                break; 
                    
                case 3: 
    
                finalDigits.push(x); 
                switchEquation();      
                break;  
                    
                case 4: 
     
                finalDigits.push(x); 
                switchEquation();      
                break;
                    
                case 5: 
   
                finalDigits.push(x); 
                GAMESTATE = "END_OF_GAME_SCREEN";   
                break;      
            }
            
  
        }
    
        function resetGame() {
        
            titleColor = "#0B9CE5";
            titleColorEnd1 = "#0B9CE5";
            titleColorEnd2 = "#0B9CE5";
        
            overStartButton = false;
            overMainMenuButton = false;
            overNewGameButton = false;
        
            overNumberButtons = [false,false,false,false,false,false,false,false,false,false];
            canMoveNumberButtons = [false,false,false,false,false,false,false,false,false,false];
            numberButtonXCoords = [];
                
            numbers = [];
            correctSums = [];
            playerAnswersX = [];
            playerAnswersValue = [];
            playerAnswersFinal = [];
            currentBoxIndex = [];
            carryingNumber = false; 
            currentTurn = 1;
                
            generateRandomNumbers(10);
        }
        
})();