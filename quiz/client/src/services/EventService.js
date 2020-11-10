import axios from "axios"

export default {
  async getEvents() {
		let res = await axios.get("http://localhost:8000/events");
		console.log(res.data);
    return res.data;
  },
  async getEventSingle(eventId) {
    let res = await axios.get("http://localhost:8000/events/" + eventId);
		console.log(res.data);
    return res.data;
  }
}