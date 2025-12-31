import { useReducer } from 'react';
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const counterReducer = (state: any, action:any) => {
		   switch (action.type) {
			   case 'INCREMENT':
				   return { count: state.count + 1 };
			   case 'DECREMENT':
					if(state.count > 0){
						 return { count: state.count - 1 };
					}
					else {
						return state;
					}
				  
			   default:
				   return state;
		   }
		};
		function Counter() {
		   const [state, dispatch] = useReducer(counterReducer, { count: 0 });
		   return (
			   <div>
				   <p>Count: {state.count}</p>
				   <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
				   <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
			   </div>
		   );
		}
		export {Counter};