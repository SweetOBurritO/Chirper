class Response {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  toResponseObject() {
    return {
      status: this.status,
      data: {
        result: this.data,
        message: this.message,
      },
    };
  }
}


module.exports = Response;
