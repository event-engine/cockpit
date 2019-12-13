import React, {useState} from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface MainLayoutProps {
    children: React.ReactElement;
}

const MainLayout = (props: MainLayoutProps) => {

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    return (
        <div>
            <TopBar onOpenSideBar={() => setSideBarOpen(true)} />
            <Sidebar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
            <div style={{ padding: '32px', paddingTop: '96px' }}>
                {props.children}
            </div>
        </div>
    );
};

export default MainLayout;