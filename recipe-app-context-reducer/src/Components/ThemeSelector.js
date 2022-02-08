import React from 'react';
import { useTheme } from '../hooks/useTheme';

const themeColors = ["blueviolet", "cadetblue", "chocolate"]
export default function ThemeSelector() {   
    const { changeColor } = useTheme()
    return <div style={{display:"flex",justifyContent: "flex-end"}}>
        {themeColors.map(color => (
            <button
                onClick={() => {changeColor(color)}}
                style={{width:"20px", height:"20px",borderRadius:"100%",margin:"15px",background:color,border:"0px",outline:"0px", cursor:"pointer"}}
            ></button>
        ))}
    </div>;
}
