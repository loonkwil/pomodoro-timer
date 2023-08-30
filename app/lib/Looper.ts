function getArrayBuffer(src: string): Promise<ArrayBuffer> {
  return fetch(src).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return response.arrayBuffer();
  });
}

/**
 * If you want to loop an audio file and you use a regular audio tag with a loop
 * attribute, on Chrome there will be a short gap between the end and the beginning
 * of the track. This could be annoying if you want to loop a short track.
 * This class tries to fix this problem by using the Web Audio API.
 */
export default class Looper {
  private ready: Promise<void>;

  private audioContext: AudioContext;
  private decodedData: AudioBuffer | null;
  private bufferSource: AudioBufferSourceNode | null;

  constructor(src: string) {
    let done = () => {};
    let error = (error: Error) => {};
    this.ready = new Promise((resolve, reject) => {
      done = resolve;
      error = reject;
    });

    this.audioContext = new AudioContext();
    this.decodedData = null;
    this.bufferSource = null;

    getArrayBuffer(src)
      .then((buffer) => this.audioContext.decodeAudioData(buffer))
      .then((decodedData) => {
        this.decodedData = decodedData;
        done();
      })
      .catch(error);
  }

  async play() {
    await this.ready;

    // An AudioBufferSourceNode can only be played once. After each call to start(),
    // you have to create a new node if you want to play the same sound again.
    const source = new AudioBufferSourceNode(this.audioContext);
    source.buffer = this.decodedData;
    source.connect(this.audioContext.destination);
    source.loop = true;
    source.start();

    this.bufferSource = source;
  }

  stop() {
    this.bufferSource?.stop();
  }
}
