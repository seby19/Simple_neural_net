
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function derivativeSigmoid(y) {
    return y * (1 - y);
}

class NeuralNetwork {

    constructor(input_nodes , output_nodes , hidden_nodes) {
        this.input_nodes = input_nodes;
        this.output_nodes = output_nodes;
        this.hidden_nodes = hidden_nodes;
        this.weights1 = new Matrix(this.hidden_nodes , this.input_nodes);
        this.weights2 = new Matrix(this.output_nodes , this.hidden_nodes);
        this.weights1.randomInit();
        this.weights2.randomInit();

        this.bias1 = new Matrix( this.hidden_nodes , 1);
        this.bias2 = new Matrix( this.output_nodes , 1);
        this.bias1.randomInit();
        this.bias2.randomInit();
        this.learning_rate = 0.1
        // console.log("w1");
        // this.weights1.printMatrix();
        // console.log("w2");
        // this.weights2.printMatrix();
        // console.log("b1");
        // this.bias1.printMatrix();
        // console.log("b2");
        // this.bias2.printMatrix();

    }




    forwardProp(input) {

        let inputs = Matrix.toMatrix(input);

        let hidden_layer = Matrix.multiply( this.weights1 , inputs);
        hidden_layer.add(this.bias1);
        hidden_layer.map(sigmoid);
        let final = Matrix.multiply( this.weights2 , hidden_layer);
        final.add(this.bias2);
        final.map(sigmoid);
        // console.log("hl");
        // hidden_layer.printMatrix();
        // console.log("op");
        // final.printMatrix();
        return Matrix.toArray(final);

    }




    train(input , expected) {

        let inputs = Matrix.toMatrix(input);
        let expectedd = Matrix.toMatrix(expected);

        // console.log("inputs");
        // inputs.printMatrix();
        // console.log("weights1");
        // this.weights1.printMatrix();

        let hidden_layer = Matrix.multiply( this.weights1 , inputs);
        hidden_layer.add(this.bias1);
        hidden_layer.map(sigmoid);
        let output = Matrix.multiply( this.weights2 , hidden_layer);
        output.add(this.bias2);
        output.map(sigmoid);
        // console.log("hidden_layer");
        // hidden_layer.printMatrix()
        // console.log("final_layer");
        // output.printMatrix();        
        // expectedd.printMatrix();

        
        let outputError = Matrix.subtract( expectedd , output);
        let outputDerivative = Matrix.map(output , derivativeSigmoid);
        let DeltaOutput = Matrix.dot(outputError , outputDerivative); // gradients


        let weights2_T = Matrix.transpose(this.weights2);
        let hiddenError = Matrix.multiply(weights2_T ,outputError);
        let hiddenDerivative = Matrix.map(hidden_layer , derivativeSigmoid);
        let DeltaHidden = Matrix.dot(hiddenError , hiddenDerivative); // hidden_gradient
        // console.log("Hidden_layer");
        // hidden_layer.printMatrix();
        // console.log("New Outputs");
        // console.log("outputError");
        // outputError.printMatrix();
        // console.log("outputDerivative");
        // outputDerivative.printMatrix();
        // console.log("DeltaOutput");
        // DeltaOutput.printMatrix();
        // console.log("weights2_T");
        // weights2_T.printMatrix();
        // console.log("hiddenError");
        // hiddenError.printMatrix();
        // console.log("hiddenDerivative");
        // hiddenDerivative.printMatrix();
        // console.log("DeltaHidden");
        // DeltaHidden.printMatrix();
        // console.log("bias1");
        // this.bias1.printMatrix();
        // console.log("bias2");
        // this.bias2.printMatrix();
        // console.log("weights1");
        // this.weights1.printMatrix();
        // console.log("weights2");
        // this.weights2.printMatrix();
        // console.log("Hidden Layer t");
        // Matrix.transpose(hidden_layer).printMatrix();
        // console.log("input Layer");
        // inputs.printMatrix();
        
        DeltaHidden.multiply(this.learning_rate);
        DeltaOutput.multiply(this.learning_rate);
        this.bias2.add(DeltaOutput);
        this.bias1.add(DeltaHidden);
        // console.log("after bias")
        // let chngWeight2 = Matrix.weightsChange(hidden_layer , DeltaOutput);
        // let chngWeight1 = Matrix.weightsChange(inputs , DeltaHidden);

        let chngWeight2 = Matrix.multiply( DeltaOutput , Matrix.transpose(hidden_layer) );
        let chngWeight1 = Matrix.multiply( DeltaHidden , Matrix.transpose(inputs));

        // console.log("after mutlt")

        // chngWeight1.printMatrix();
        // chngWeight2.printMatrix();
        // this.weights1.printMatrix();
        // this.weights2.printMatrix();
        this.weights2.add(chngWeight2);
        this.weights1.add(chngWeight1);

        
    }

    
}