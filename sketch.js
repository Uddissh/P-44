const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;

var game

function preload() { 

}

function setup() {

    engine = Engine.create();
    world = engine.world;

    database = firebase.database();

  console.log(database);

  createCanvas(500,500);

  game = new Game()
  game.getState();
  game.start();

}

function draw() {

    background("white")

}