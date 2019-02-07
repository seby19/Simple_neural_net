let data_training = [{
    inputs: [0,1],
    expected: [1]
    },
    {
        inputs: [1,0],
        expected: [1]
    },
    {
        inputs: [0,0],
        expected: [0]
    },
    {
        inputs: [1,1],
        expected: [0]
    }];


function setup() {
    let brain = new NeuralNetwork( 2 , 1 , 3);


    console.log(brain.forwardProp([0 , 0]));
    console.log(brain.forwardProp([1 , 1]));
    console.log(brain.forwardProp([0 , 1]));
    console.log(brain.forwardProp([1 , 0]));

    console.log("after training")
    for(j = 0; j < 100000 ; j++)
    {   
        // console.log("Train " + j);
        let data = data_training[Math.floor(Math.random() * 4)];
        // console.log(data)
        brain.train(data.inputs , data.expected);
    }


    
    console.log(brain.forwardProp([0 , 0]));
    console.log(brain.forwardProp([1 , 1]));
    console.log(brain.forwardProp([0 , 1]));
    console.log(brain.forwardProp([1 , 0]));
    
}

function plot() {

}