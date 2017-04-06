import Dispatcher from "./dispatcher";
import SimpleStore from "./store";

export default class SimpleDux
{
	/**
	 * The Dispatcher is used to injecct events and register callbacks for events
	 */
	public Dispatcher = new Dispatcher();

	/**
	 * The Store alllows you persist an object or register a factory to create instances
	 */
	public Store = new SimpleStore();
}
