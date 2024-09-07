import { useState, useEffect, useCallback } from 'react';
import { IonContent, IonLoading, IonPage, IonToast, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import CesiumViewer from '../components/cesium';

// Main page with resizable split plane (cesium left, aircraft status right) and bottom bar layout (function bar and chart)

const Main: React.FC = () => {

    const [heightPercent, setHightPercent] = useState(70);
    const [widthPercent, setWidthPercent] = useState(50);
    const [isResizingWidth, setIsResizingWidth] = useState(false);
    const [isResizingHeight, setIsResizingHeight] = useState(false);

    // Handle mouse up
    const handleMouseUpHeight = useCallback(() => {
        if (isResizingHeight) {
            setIsResizingHeight(false);
        }
    }, [isResizingHeight]);

    const handleMouseUpHWidth = useCallback(() => {
        if (isResizingWidth) {
            setIsResizingWidth(false);
        }
    }, [isResizingWidth]);

    // Handle mouse move
    const handleMouseMoveHeight = useCallback((e: MouseEvent) => {
        if (isResizingHeight) {
            const newHeight = e.clientY; //Get Y-coordinate of mouse
            const windowHeight = window.innerHeight; // Get total window height
            const newHeightPercent = (newHeight / windowHeight) * 100;

            if (newHeightPercent >= 50 && newHeightPercent <= 100) {
                setHightPercent(newHeightPercent);
            }
        }
    }, [isResizingHeight]);

    const handleMouseMoveWidth = useCallback((e: MouseEvent) => {
        if (isResizingWidth) {
            const newWidth = e.clientX; //Get Y-coordinate of mouse
            const windowWidth = window.innerWidth; // Get total window height
            const newWidthPercent = (newWidth/ windowWidth) * 100;
            if (newWidthPercent >= 50 && newWidthPercent <= 100) {
                setWidthPercent(newWidthPercent);
            }
        }
    }, [isResizingWidth]);
    
    // Setup and clean up event listeners
    useEffect(() => {
        if (isResizingHeight){
            document.addEventListener('mousemove', handleMouseMoveHeight);
            document.addEventListener('mouseup', handleMouseUpHeight);
        } else if (isResizingWidth){
            document.addEventListener('mousemove', handleMouseMoveWidth);
            document.addEventListener('mouseup', handleMouseUpHWidth);
        } else {
            document.removeEventListener('mousemove', handleMouseMoveHeight);
            document.removeEventListener('mouseup', handleMouseUpHeight);
            document.removeEventListener('mousemove', handleMouseMoveWidth);
            document.removeEventListener('mouseup', handleMouseUpHWidth);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMoveHeight);
            document.removeEventListener('mouseup', handleMouseUpHeight);
            document.removeEventListener('mousemove', handleMouseMoveWidth);
            document.removeEventListener('mouseup', handleMouseUpHWidth);
        }
    }, [isResizingHeight, isResizingWidth, handleMouseMoveHeight, handleMouseMoveWidth, handleMouseUpHeight, handleMouseUpHWidth])

    return (
        <IonPage>
            {/* <IonLoading isOpen={true} spinner={'crescent'}/>
            <IonToast isOpen={true} position='top'/> */}
            <IonContent scrollX={false} scrollY={false}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
                    {/* Top */}
                    <div style={{ display: 'flex', flexDirection: 'row', height: `${heightPercent}%`, width: '100%'}}>
                        {/* Left Pane */}
                        <div style={{
                            width: `${widthPercent}%`,
                            // overflow: 'hidden',
                            // display: 'flex',
                            // flexDirection: 'column',
                        }}>
                            <CesiumViewer/>
                        </div>
                        {/* Side bar */}
                        <div style={{
                            width: '10px',
                            cursor: 'ew-resize',
                            backgroundColor: '#ccc',
                            borderLeft: '1px solid #aaa',
                            borderRight: '1px solid #aaa',
                            userSelect: 'none'
                        }} onMouseDown={() => {setIsResizingWidth(true)}} />
                        {/* Right Pane */}
                        <div style={{
                            width: `${100-widthPercent}%`,
                            // flexGrow: 1,
                            overflow: 'auto',
                        }}>
                            <h2>right</h2>
                        </div>
                    </div>
                    {/* Bottom bar*/}
                    <div style={{
                        height: '10px',
                        cursor: 'ns-resize',
                        backgroundColor: '#ccc',
                        borderTop: '1px solid #aaa',
                        borderBottom: '1px solid #aaa',
                        userSelect: 'none'
                    }} onMouseDown={() => {setIsResizingHeight(true)}} />
                    {/* Bottom Pane */}
                    <div style={{
                        height: `${100-heightPercent}%`,
                        overflow: 'auto',
                    }}>
                        <h2>Bottom Bar</h2>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
  }
  
export default Main;