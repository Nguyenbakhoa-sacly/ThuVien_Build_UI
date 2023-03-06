
export default function html([first,...strings],...values){
    return values.reduce(
        (acc,cur)=>acc.concat(cur, strings.shift()),
        [first]
    )
    
    .filter(x => x && x !== true || x === 0)//neu gia tri la bollen thi ko hien
    .join('')//dung de loai tao chuoi

}

export function createStore(reducer){
    let state  = reducer()
    const roots = new Map()

    function render(){
        for(const [root,component] of roots){
            const output =component()
            root.innerHTML = output
        }
    }
    return {
        attach(component,root){
            roots.set(root,component)
            render()
        },
        //store dung de luu du lieu
        //ket noi store voi view
        connect(selector = state => state){
            return component=> ( props, ...args)=>
            component(Object.assign({},props, selector(state),...args))
        },
        //thuc hien hang dong
        dispatch(action,...args){
            state = reducer(state,action,args); 
            render()
        }
    }
}