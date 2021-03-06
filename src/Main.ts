//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

@at.res<Main>({
    url: "resource/default.res.json",
    root: "resource/",
    preload: "preload",
    finish: it => it.onResLoadComplete,
    progress: it => it.onResProgress
})
@at.ui<Main>({
    theme: "resource/default.thm.json",
    finish: it=>it.onThemeLoadComplete,
    assetAdapter: AssetAdapter,
    themeAdapter: ThemeAdapter
})
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
    }
    private isThemeLoadEnd: boolean = false;
    private isResourceLoadEnd: boolean = false;

    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private onResLoadComplete(): void {
        this.isResourceLoadEnd = true;
        this.stage.removeChild(this.loadingView);
        this.createScene();
    }
    private onResProgress(loaded: number, total: number) {
        this.loadingView.setProgress(loaded, total);
    }
    private createScene() {
        if (!this.isThemeLoadEnd || !this.isResourceLoadEnd) {
            return;
        }

        var instance = new demo.NewComp();
        this.addChild(instance);
        demo.MyComponent.Abc = 5788;
        console.log(demo.MyComponent.Abc);
    }
}

