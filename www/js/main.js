window.onload = function (){
	const totalnum = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
	
    var score = 0;
	var level = 1;
	var move = 0;	
	var mode = ""; //leisure、normal、continue
	var time=300;
	var hasRecord = false;
	var finishRow = 0;
	
	

	
	function getData(){
		// let saveData = localStorage.getItem("rank");
		let saveData = localStorage.getItem("lastData");
		//console.log(saveData);
		let obj = (saveData === "" || saveData == null)? null:JSON.parse(saveData);
		return obj;
	}
	
	function getTimeData(){
		let saveTimeData = localStorage.getItem("lastTimeData");
		if(saveTimeData == null){
			return time;
		}
		return saveTimeData;
	}
	
function newRec(rate){
    let output = [];
    for(var i = 0; i < (4 * rate) ;i++){
      output= output.concat(totalnum);
    }
    return output;
}

var rec = newRec(1);

function getLevelCard(nowLevel){
	let levelCard = [];
	for(var i = totalnum.length-1 ; i >= (nowLevel-1) ; i--){
		levelCard.push(totalnum[i]);
	}
	return levelCard;
}

function setCardContainer(){	//配牌
	let output = [];
	let levelCard = getLevelCard(1);
	for(var i = 0; i<7;i++){
		for(var k = 0; k<7;k++){
			if( (i == 0 && k == 0) || ((i == 0 && k == 6)) || (i == 6 && k == 0) || (i == 6 && k == 6) ){
				output.push({});
				continue;
			}else{
				var tmp = Math.floor(Math.random()*rec.length);
				
				if(levelCard.length > 0 && i !=0 && i !=6 && k !=0 && k !=6 ){
					let levelCardIndex = levelCard.indexOf(rec[tmp]);	
					
					while(levelCardIndex < 0){
						tmp = Math.floor(Math.random()*rec.length);
						levelCardIndex = levelCard.indexOf(rec[tmp]);							
						console.log("Rerandom");
					}
					
					levelCard.splice(levelCardIndex,1);
				}
				output.push({
					"no":rec[tmp],
					"row":i,
					"order":k,
					"index": (i*7) + k,
					"choose": "no",
					"status": 1,
					"max":rec[tmp],
					"min":rec[tmp],
					"isShow":"yes"
				});
				rec.splice(tmp,1);
				
			}
		} 
	}
	return output;
}

function init(){
	let loadData = getData();
	if(loadData != null){
		rec = loadData.rec;
		score = loadData.score;
		level = loadData.level;
		move = loadData.move;
		hasRecord = true;
		mode = loadData.mode;
		finishRow = loadData.finishRow;
		time = getTimeData();
		return loadData.cards;
	}
  var output = setCardContainer(level);
  return output;
}

function checkDes(obj_1,obj_2){
  let des = "";
  if((obj_1.row - obj_2.row) == 1 && obj_1.order == obj_2.order){
    des = "top"; //往上
  }else if( (obj_2.row - obj_1.row) == 1 && obj_1.order == obj_2.order){
    des = "bottom"; //往下
  }else if( (obj_1.order - obj_2.order) == 1 && obj_1.row == obj_2.row){
    des = "left"; //往左
  }else if( (obj_2.order - obj_1.order) == 1 && obj_1.row == obj_2.row){
    des = "right"; //往右
  }else{
    //不動
  }
  return des; 
}

function setNewRec(rate){
  rec = newRec(rate);
}

function setNewCard(obj,nowLevel,nowCards){
  var tmp = Math.floor(Math.random()*rec.length);
  
  console.log("rec.length---" + rec.length);
  console.log("setNewCard---");
  let levelCard = getLevelCard(nowLevel);
  console.log("--->>" + levelCard.length);
  if(levelCard.length > 0){
	for(var i = 0 ; i < nowCards.length ; i++){
		var tmpNo = nowCards[i]["no"];
		if( levelCard.indexOf(tmpNo) >= 0){
			levelCard.splice(tmpNo);
		}
	}
  }
  console.log("00--->>" + levelCard.length);
  if(levelCard.length > 0){
	let levelCardIndex = levelCard.indexOf(rec[tmp]);	
					
	while(levelCardIndex < 0){
		tmp = Math.floor(Math.random()*rec.length);
		levelCardIndex = levelCard.indexOf(rec[tmp]);							
		console.log("setNewCard Rerandom");
	}
  }
  
  
  obj.no = rec[tmp];
  obj.max = rec[tmp];
  obj.min = rec[tmp];
  obj.status = 1;
  rec.splice(tmp,1);
  
  if(rec.length === 0){
    setNewRec(nowLevel/2);
  }
}

function check(){
  
}

var cards = init();

	function setData(level,move,score,setMode,finish_row){
		//localStorage.setItem("rank", JSON.stringify(this.lists));
		localStorage.setItem("lastData", JSON.stringify({
			level:level,
			score:score,
			move:move,
			rec:rec,
			cards:cards,
			mode:setMode,
			finishRow:finish_row
		}));
	}
	function setTimeData(nowTime){
		localStorage.setItem("lastTimeData", nowTime);
	}
	
	

function getLevel(no){
  let outputnu;
  switch(no){
    case "A":
      outputnu = 1;
      break;
    case "2":
      outputnu = 2;
      break;
    case "3":
      outputnu = 3;
      break;
    case "4":
      outputnu = 4;
      break;
    case "5":
      outputnu = 5;
      break;
    case "6":
      outputnu = 6;
      break;
    case "7":
      outputnu = 7;
      break;
    case "8":
      outputnu = 8;
      break;
    case "9":
      outputnu = 9;
      break;
    case "10":
      outputnu = 10;
      break;
    case "J":
      outputnu = 11;
      break;
    case "Q":
      outputnu = 12;
      break;
    case "K":
      outputnu = 13;
      break;
  }
  return outputnu;
}

function checkLevel(obj_1,obj_2){
  let max_1 = getLevel(obj_1.max);
  let min_1 = getLevel(obj_1.min);
  let max_2 = getLevel(obj_2.max);
  let min_2 = getLevel(obj_2.min);
  let output = false;
  /*
  if( (min_2 - max_1) == 1 ){
    output = 1;
  }else if( (min_1 - max_2) == 1 ){
    output = 2;
  }else if( (max_1 < max_2 && max_1 >= min_2) || (max_1 == max_2 && min_1 < min_2 ) ){
    output = 3;
  }else if( (max_2 < max_1 && max_2 >= min_1) || (max_2 == max_1 && min_2 < min_1) ){
    output = 4;
  }else if(max_1 == 13 || max_2 == 13){
    output = 5;
  }
  */
  if(max_1 == 13){
    output = 5;
  }else{
	if( (min_2 - max_1) == 1 ){
		output = 1;
	}else if( min_1 < min_2 && max_1 >= min_2 ){
		output = 3;
	}
  }
  return output;
}

function scrollCards(des,cards,obj_1,obj_2,index_1){
  if(des == "top"){    
    
    cards.forEach(function(card){
       if(card.order == obj_2.order && card.row > obj_1.row){
           card.row --;
       }
    });
    cards[index_1].row = 6;
                
  }else if(des == "bottom"){
                
    cards.forEach(function(card){
      if(card.order == obj_2.order && card.row < obj_1.row){
        card.row ++;
      }
    });
    cards[index_1].row = 0;
                
   }else if(des == "left"){
                
     cards.forEach(function(card){
        if(card.row == obj_2.row && card.order > obj_1.order){
           card.order --;
        }
     });
     cards[index_1].order = 6;
                
   }else{
                
      cards.forEach(function(card){
        if(card.row == obj_2.row && card.order < obj_1.order){
          card.order ++;
        }
      });
      cards[index_1].order = 0;
                
   }
}

function getRankData(){
	let saveData = localStorage.getItem("rankData");
	let obj = (saveData === "" || saveData == null)? {"leisure":[],"normal":[]}:JSON.parse(saveData);
	return obj;
}

function isLevelup(nowFinishRow){
	if(nowFinishRow%4 == 0){
		return true;
	}
	return false;
}

function checkFinish(obj){
  let output = false;
  if(obj.max == "K" && obj.min == "A"){
	output = true;
  }
  return output;
}

function checkLose(now_cards){
	let isLose = true;
	var hasK = false;
	
	now_cards.forEach(function(card_1){
		if(card_1.isShow != null && card_1.isShow == "yes" && card_1.row != 0 && card_1.row != 6 && card_1.order != 0 && card_1.order != 6){
			if(card_1.max == "K"){
				hasK = true;
				return hasK;
			}
		}
	});
	now_cards.forEach(function(card_1){
		
		if(card_1.isShow != null && card_1.isShow == "yes" && card_1.row != 0 && card_1.row != 6 && card_1.order != 0 && card_1.order != 6){
			for(var i=0 ; i < now_cards.length ; i++){
				let card_2 = now_cards[i];
				if(card_2.isShow != null && card_2.isShow == "yes" && card_2.row != 0 && card_2.row != 6 && card_2.order != 0 && card_2.order != 6){
					
					if(hasK){
						//有K就不檢查是不是相鄰的
						if(getLevel(card_1.max) == getLevel(card_2.min) - 1 || getLevel(card_1.min) == getLevel(card_2.max) + 1){
							isLose = false;
							break;
						}
					}
					
					if( ( (card_1.row + 1) == card_2.row || (card_1.row - 1) == card_2.row ) && card_1.order == card_2.order ){
						if(getLevel(card_1.max) == getLevel(card_2.min) - 1 || getLevel(card_1.min) == getLevel(card_2.max) + 1){
							isLose = false;
							break;
						}
					}
					
					if( ( (card_1.order + 1) == card_2.order || (card_1.order - 1) == card_2.order ) && card_1.row == card_2.row ){
						if(getLevel(card_1.max) == getLevel(card_2.min) - 1 || getLevel(card_1.min) == getLevel(card_2.max) + 1){
							isLose = false;
							break;
						}
					}
					
				}
			}
		}
		if(!isLose){
			return isLose;
		}
    });
	return isLose;
}

	function getFirstGameData(){
		let saveData = localStorage.getItem("firstGameData");
		let obj = (saveData === "false" || saveData == null)? true: false;
		return obj;
	}
	
	function setFirstGameData(){
		localStorage.setItem("firstGameData", true);
	}


var vm = new Vue({
	  el: "#vue",
	  data: {
		isFirstGame:false,
		showHome:true,
		hasRecord:hasRecord,
		mode:'leisure',
		time:300,  //300s  
		timer:null,
		timeBar:100,
		timeBonus:20,
        cards: cards,
        selected:false,
        selectCards:[],
		score:score,
		finishRow:finishRow,
		level:level,
		move:move,
		isFinish:false,
		isLevelUp:false,
		showMask:false,
		showMenu:false,
		isEnd:false,
		showRank:false,
		showTeaching:false,
		thisTimeRankIndex:10,
		rankData:[],
		endMessage:"",
		isTeaching_1:true,
		teaching_title:"",
		finishCard:{
		    "row":1,
            "order":1
		}
      },
    methods:{
		startGame:function(selMode){
			if(selMode == 'continue'){
				this.mode = mode;
				this.time = time;
				this.reSetCard();
			}else{  //leisure、normal
				this.mode = selMode;
			}
			this.showHome = false;
			this.isFirstGame = getFirstGameData();
			
			if(this.mode == 'normal'){
				this.setTimeBar();
				this.timer = window.setInterval(function(){
					if(vm.showMenu || vm.showMask){
						return;
					}
					vm.time--;
					vm.setTimeBar();
					setTimeData(vm.time);
					if(vm.isEnd){
						window.clearInterval(vm.timer);
					}
					if(vm.time <= 0){
						//時間到!!
						//vm.showMask = true;
						//vm.isEnd = true;
						vm.endMessage = "Time's up";
						vm.showEndAnima();
						window.clearInterval(vm.timer);
						
					}
					
				}, 1000);
			}
			if(this.isFirstGame){
				this.showTeachingView();
				setFirstGameData();
			}
		},
		reStartGame:function(){
			localStorage.removeItem("lastData");
			localStorage.removeItem("lastTimeData");
			window.location.reload();
		},
		setTimeBar:function(){
			if(this.time >= 300){
				this.timeBar = 100;
			}else{
				this.timeBar = (this.time/300)*100;
			}
		},
		setRank:function(isEndGame){
			// rank level score finishRow
			
			var rankDataObj = getRankData();
			var rankData = rankDataObj[this.mode]; //leisure、normal
			var tmpRankData = [];
			var viewRankData = [];
			var hasAddRank = false;
			if(!isEndGame){
				for(var i = 0 ; i < 10 ; i++){
					if(rankData.length > 0 && i < rankData.length){
						viewRankData.push(rankData[i]);
					}else{
						viewRankData.push({
							level:"",
							score:"",
							finishRow:""
						});
					}
				}
				this.rankData = viewRankData;
				return;
			}
			if(rankData.length > 0){
				for(var i = 0 ; i < rankData.length ; i++){
					if(hasAddRank){
						tmpRankData.push(rankData[i]);
						viewRankData.push(rankData[i]);
					}else{
						if( (rankData[i].score > this.score) || ( rankData[i].score == this.score && rankData[i].level <= this.level ) ){
							tmpRankData.push(rankData[i]);
							viewRankData.push(rankData[i]);
						}else if(!hasAddRank){
							tmpRankData.push({
								level:this.level,
								score:this.score,
								finishRow:this.finishRow
							});
							viewRankData.push({
								level:this.level,
								score:this.score,
								finishRow:this.finishRow
							});
							hasAddRank = true;
							this.thisTimeRankIndex = i;
						}
					}
					
					if(tmpRankData.length >= 10){
						break;
					}else if(!hasAddRank && i == rankData.length-1){
						tmpRankData.push({
							level:this.level,
							score:this.score,
							finishRow:this.finishRow
						});
						viewRankData.push({
							level:this.level,
							score:this.score,
							finishRow:this.finishRow
						});
						this.thisTimeRankIndex = tmpRankData.length - 1;
					}
				}
			}else{
				tmpRankData.push({
					level:this.level,
					score:this.score,
					finishRow:this.finishRow
				});
				viewRankData.push({
					level:this.level,
					score:this.score,
					finishRow:this.finishRow
				});
				this.thisTimeRankIndex = 0;
			}
			var def = 10 - viewRankData.length;
			if(def > 0){
				for(var i = 0 ; i < def ; i++){
					viewRankData.push({
						level:"",
						score:"",
						finishRow:""
					});
				}
				
			}
			this.rankData = viewRankData;
			rankDataObj[this.mode] = tmpRankData;
			localStorage.setItem("rankData", JSON.stringify(rankDataObj));
		},
		levelUp:function(){
			this.level++;
			this.isLevelUp = true;
			this.showMask = true;
			
			
			setTimeout(function(){
				vm.isLevelUp = false;
				vm.showMask = false;
			}, 900);
			
			
			//console.log("Level Up");
			//console.log("Now Level:" + this.level);
		},
      selectCard:function(card){
        this.selectCards.push(card);
        if(card.isEnd){
			return;
		}
        if(!this.selected){
          this.selected = true;
          this.cards[card.index].choose = "yes";
        }else{
          var card_1 = this.selectCards[0];
          var card_2 = this.selectCards[1];
          var index_1 = card_1.index;
          var index_2 = card_2.index;
          
          
          let temp_1 = {};
          let temp_2 = {};
          Object.assign(temp_1,this.cards[index_1]);
          Object.assign(temp_2,this.cards[index_2]);
          
          let level = checkLevel(temp_1,temp_2);
          let des = checkDes(temp_1,temp_2);
          
          if(des != "" && level && level != 5){
              if(level == 1){
                  this.cards[index_2].min = temp_1.min;
                  scrollCards(des,this.cards,temp_1,temp_2,index_1)
                  
                  this.cards[index_1].isShow = "no";
                  setNewCard(this.cards[index_1],this.level,this.cards);
                
                  setTimeout(function(){
                     Vue.set(vm.cards[index_1], "isShow", "yes")
					 setData(vm.level,vm.move,vm.score,vm.mode,vm.finishRow);
                  }, 500);
                  this.cards[index_2].status = 2;
				  this.move ++;
				  
				  if( checkFinish(this.cards[index_2]) ){
					this.addScore();
					scrollCards(des,this.cards,temp_2,temp_2,index_2)
					this.cards[index_2].isShow = "no";
					setNewCard(this.cards[index_2],this.level,this.cards);
					
					setTimeout(function(){
						Vue.set(vm.cards[index_2], "isShow", "yes");
						setData(vm.level,vm.move,vm.score,vm.mode,vm.finishRow);
					}, 500);
					this.cards[index_2].status = 1;
					this.finish(temp_2.row,temp_2.order);
					this.time = this.time+this.timeBonus+(this.level*2);
					this.setTimeBar();
					this.finishRow++;
					if(isLevelup(this.finishRow)){
						this.levelUp();
					}
				  }else{
					setData(this.level,this.move,this.score,this.mode,this.finishRow);
				  }
				  
              }else if(level == 2){
                  this.cards[index_2].max = temp_1.max;
                  scrollCards(des,this.cards,temp_1,temp_2,index_1)
                  
                  this.cards[index_1].isShow = "no";
                  setNewCard(this.cards[index_1],this.level,this.cards);
                
                  setTimeout(function(){
                     Vue.set(vm.cards[index_1], "isShow", "yes")
					 setData(vm.level,vm.move,vm.score,vm.mode,vm.finishRow);
                  }, 500);
                  this.cards[index_2].status = 2;
				  this.move ++;
				  
				  if( checkFinish(this.cards[index_2]) ){
					  this.addScore();
					scrollCards(des,this.cards,temp_2,temp_2,index_2)
					this.cards[index_2].isShow = "no";
					setNewCard(this.cards[index_2],this.level,this.cards);
					setTimeout(function(){
						Vue.set(vm.cards[index_2], "isShow", "yes");
						setData(vm.level,vm.move,vm.score,vm.mode,vm.finishRow);
					}, 500);
					this.cards[index_2].status = 1;
					this.finish(temp_2.row,temp_2.order);
					this.time = this.time+this.timeBonus+(this.level*2);
					this.setTimeBar();
					this.finishRow++;
					if(isLevelup(this.finishRow)){
						this.levelUp();
					}
				  }else{
					setData(this.level,this.move,this.score,this.mode,this.finishRow);
				  }
				  
              }else{ //level in 3 , 4
                  this.cards[index_2].min = temp_1.min;
                  this.cards[index_1].min = temp_2.min;
                  
                  if(this.cards[index_2].max == this.cards[index_2].min){
                    this.cards[index_2].status = 1;
                  }else{
                    this.cards[index_2].status = 2;
                  }
                  if(this.cards[index_1].max == this.cards[index_1].min){
                    this.cards[index_1].status = 1;
                  }else{
                    this.cards[index_1].status = 2;
                  }
				  this.move ++;
				  
				  if( checkFinish(this.cards[index_2]) ){
					this.addScore();
					scrollCards(des,this.cards,temp_2,temp_2,index_2)
					this.cards[index_2].isShow = "no";
					setNewCard(this.cards[index_2],this.level,this.cards);
					setTimeout(function(){
						Vue.set(vm.cards[index_2], "isShow", "yes");
						setData(vm.level,vm.move,vm.score,vm.mode,vm.finishRow);
					}, 500);
					this.cards[index_2].status = 1;
					this.finish(temp_2.row,temp_2.order);
					this.time = this.time+this.timeBonus+(this.level*2);
					this.setTimeBar();
					this.finishRow++;
					if(isLevelup(this.finishRow)){
						this.levelUp();
					}
				  }else{
					setData(this.level,this.move,this.score,this.mode,this.finishRow);
				  }
                  
              }
              
          }else if(des != "" && level == 5){
            //對調位置
            this.cards[index_1].row = temp_2.row;
            this.cards[index_1].order = temp_2.order;
            this.cards[index_2].row = temp_1.row;
            this.cards[index_2].order = temp_1.order;
			this.move ++;
			setData(this.level,this.move,this.score,this.mode,this.finishRow);
          }
          
          this.selected = false;
          this.selectCards = [];
          this.cards[index_1].choose = "no";
		  
		  if(checkLose(this.cards)){
			//this.showMask = true;
			//this.isEnd = true;
			this.endMessage = "You Lose";
			this.showEndAnima();
		  }

		  
        }
      },
	  reSetCard:function(){
		  this.cards.forEach(function(tmpCard){
			  tmpCard["isEnd"] = false;	
		  });
	  },
	  showEndAnima:function(){
		  this.cards.forEach(function(tmpCard){
			  tmpCard["isEnd"] = true;	
		  });
		  setTimeout(function(){
			vm.showMask = true;
			vm.isEnd = true;
		  }, 1000);

	  },
	  keepPlay:function(){
		  this.cards.forEach(function(tmpCard){
			  tmpCard["isEnd"] = false;	
			  tmpCard["choose"] = "no";
		  });
		  this.showMask = false;
		  this.isEnd = false;
	  },
	  sureEnd:function(){
		  this.setRank(true);
		  this.showRank = true;
		  localStorage.removeItem("lastData");
	      localStorage.removeItem("lastTimeData");
	  },
	  showRankView:function(){
		  this.showMask = true;
		  this.showMenu = false;
		  this.setRank(false);
		  this.showRank = true;
	  },
	  closeRankView:function(){
		  this.showMenu = true;
		  this.showRank = false;
	  },
	  showTeachingView:function(){
		  this.showMask = true;
		  this.showMenu = false;
		  this.showTeaching = true;
		  this.isTeaching_1 = true;
		  this.teaching_title = "介面介紹";
	  },
	  changeTeachingView:function(){
		  this.isTeaching_1 = !this.isTeaching_1;
		  if(this.isTeaching_1){
			this.teaching_title = "介面介紹";
		  }else{
			this.teaching_title = "遊戲規則";
		  }
	  },
	  closeTeachingView:function(){
		  this.showTeaching = false;
		  this.showMask = false;
	  },
	  addScore:function(){
		let _this = this;
		let num = 200 + (this.level * 10) - this.move;
		if(num < 0){
			num  = 0;
		}
		this.move = 0;
        let timer = window.setInterval(() => {

            if(num > 0){
				_this.score++;
                num --;

            }else{
				setData(_this.level,_this.move,_this.score,_this.mode,_this.finishRow);
                window.clearInterval(timer)   
            }
        }, 5);
	  },
	  finish:function(row,order){
		this.finishCard.row = row;
		this.finishCard.order = order;
		this.isFinish = true;
	  },
	  finishOver:function(){
		this.isFinish = false;
	  },
	  resetData:function(){
		 localStorage.removeItem("lastData");
		 localStorage.removeItem("lastTimeData");
		 window.location.reload();
	  },
	  check:function(){
		alert(JSON.stringify(this.cards));
	  },
	  openMenu:function(){
		  this.showMask = true;
		  this.showMenu = true;
	  },
	  closeMenu:function(){
		  this.showMask = false;
		  this.showMenu = false;
	  },
	  backHome:function(){
		 window.location.reload(); 
	  }
    }
});
	
	
}