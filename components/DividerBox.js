import { Divider, DockLayout } from 'rc-dock';
import React from 'react';

export default class DividerBox extends React.PureComponent {

    _ref;
    getRef = (r) => {
      this._ref = r;
    };
  
    getDividerData = (idx) => {
      if (!this._ref) {
        return null;
      }
      let {children, mode} = this.props;
      let nodes = this._ref.childNodes;
      let length = 1;
      if (Array.isArray(children)) {
        length = children.length;
      }
      if (nodes.length !== length * 2 - 1) {
        return;
      }
      let dividerChildren= [];
      for (let i = 0; i < length; ++i) {
        if (mode === 'vertical') {
          dividerChildren.push({size: (nodes[i * 2]).offsetHeight});
        } else {
          dividerChildren.push({size: (nodes[i * 2]).offsetWidth});
        }
      }
      return {
        element: this._ref,
        beforeDivider: dividerChildren.slice(0, idx),
        afterDivider: dividerChildren.slice(idx)
      };
    };
    changeSizes = (sizes) => {
      let {mode} = this.props;
      let nodes = this._ref.childNodes;
      if (nodes.length === sizes.length * 2 - 1) {
        for (let i = 0; i < sizes.length; ++i) {
          if (mode === 'vertical') {
            (nodes[i * 2]).style.height = `${sizes[i]}px`;
          } else {
            (nodes[i * 2]).style.width = `${sizes[i]}px`;
          }
        }
        this.forceUpdate();
      }
    };
  
    onDragEnd = () => { 
      if (this.props.onDragEnd) { 
        this.props.onDragEnd();
      }
    };
    render() {
      let {children, mode, className, ...others} = this.props;
      let isVertical = mode === 'vertical';
      let childrenRender = [];
      let classes = "rc-divider";
      if (isVertical) { 
        classes+=" rc-divider-vertical";
      } else { 
        classes+=" rc-divider-horizontal";
      }
      if (Array.isArray((children))) {
        for (let i = 0; i < children.length; ++i) {
          if (i > 0) {
            (childrenRender).push(
              <Divider idx={i} key={i} isVertical={isVertical} className={classes}
                       getDividerData={this.getDividerData} onDragEnd={this.onDragEnd} changeSizes={this.changeSizes}/>
            );
          }
          (childrenRender).push(children[i]);
        }
      } else {
        childrenRender = children;
      }
  
      let cls;
      if (mode === 'vertical') {
        cls = 'divider-box dock-vbox';
      } else {
        cls = 'divider-box dock-hbox';
      }
      if (className) {
        cls = `${cls} ${className}`;
      }
      return (
        <div ref={this.getRef} className={cls} {...others}>
          {childrenRender}
        </div>
      );
    }
  }
  