import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import menu from "./data";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: menu[0].data,
            currentMenu: menu,
            parentMenu: [],
            selectedItem: "Learn",
            hoveredItem: menu[0].name,
            backgroundColorchild: 0
        };
        this.hover = this.hover.bind(this);
        this.rgb = this.fillColorArray(menu.length);
        this.menuItemClicked = this.menuItemClicked.bind(this);
    }

    hover(order, i) {
        if (order.data) {
            this.setState({
                hovered: order.data,
                backgroundColorchild: i,
                hoveredItem: order.name
            });
        } else {
            this.setState({ hovered: [] });
        }
    }

    menuItemClicked(order) {
        if (order.data[0].data) {
            this.setState({
                parentMenu: this.state.currentMenu,
                currentMenu: order.data,
                hovered: order.data[0].data,
                hoveredItem: order.data[0].name,
                selectedItem: order.name
            });
        }
    }
    ChildmenuItemClicked(order) {
        if (order.data) {
            this.setState({
                parentMenu: this.state.currentMenu,
                currentMenu: this.state.hovered,
                hovered: this.state.hovered[0].data,
                hoveredItem: this.state.hovered[0].name
            });
        } else {
            alert(order.name);
        }
    }
    handleChange(e) {
        for (var i = 0; i < this.state.parentMenu.length; i++) {
            if (
                this.state.parentMenu[i].name === e.target.value &&
                this.state.parentMenu[i].data
            ) {
                this.setState({
                    currentMenu: this.state.parentMenu[i].data,
                    hovered: this.state.parentMenu[i].data[0].data,
                    hoveredItem: this.state.parentMenu[i].data[0].name,
                    selectedItem: e.target.value
                });
            } else if (!this.state.parentMenu[i].data) {
                alert(e.target.value);
            }
        }
    }
    fillColorArray(length) {
        var rgb = [];
        for (var i = 0; i < length; i++) {
            rgb[i] = this.getRandomColor();
        }
        return rgb;
    }
    // getBackgroundColor(length, index) {
    //     const rgb = [
    //         "#800040",
    //         "#433622",
    //         "#424949",
    //         "#4a235a",
    //         "#154360",
    //         "#21618c"
    //     ];
    //     if (i < 6) return rgb[i];
    //     else {
    //         return rgb[i % 6];
    //     }
    // }
    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return this.increase_brightness(color, 900);
    }
    increase_brightness(hex, percent) {
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, "");

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, "$1$1");
        }

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return (
            "#" +
            (0 | ((1 << 8) + r + (256 - r) * percent / 100))
                .toString(16)
                .substr(1) +
            (0 | ((1 << 8) + g + (256 - g) * percent / 100))
                .toString(16)
                .substr(1) +
            (0 | ((1 << 8) + b + (256 - b) * percent / 100))
                .toString(16)
                .substr(1)
        );
    }

    render() {
        return (
            <div className="App">
                <div className="Header">
                    <div className="parent-name">
                        {this.state.parentMenu.length !== 0 ? (
                            <select
                                value={this.state.selectedItem}
                                onChange={e => this.handleChange(e)}
                            >
                                {this.state.parentMenu.map((order, i) => {
                                    return (
                                        <option
                                            value={order.name}
                                            onClick={order =>
                                                this.menuItemClicked(order)}
                                        >
                                            {order.name}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : (
                            <select>
                                <option value="Learn">Learn</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="body">
                    <div className="main-menu">
                        <ul>
                            {this.state.currentMenu.map((order, i) => {
                                return (
                                    <div>
                                        <li
                                            style={{
                                                backgroundColor:
                                                    order.name ===
                                                    this.state.hoveredItem
                                                        ? "black"
                                                        : "transparent",
                                                color:
                                                    order.name ===
                                                    this.state.hoveredItem
                                                        ? "white"
                                                        : "black"
                                            }}
                                            onMouseOver={() =>
                                                this.hover(order, i)}
                                            onClick={() =>
                                                this.menuItemClicked(order)}
                                        >
                                            {order.name}
                                            {order.data ? (
                                                <i
                                                    style={{
                                                        color:
                                                            order.name ===
                                                            this.state
                                                                .hoveredItem
                                                                ? "white"
                                                                : "black",
                                                        webkitTextStroke:
                                                            order.name ===
                                                            this.state
                                                                .hoveredItem
                                                                ? "3px white"
                                                                : "0.5px grey"
                                                    }}
                                                    className="fa fa-angle-right"
                                                />
                                            ) : null}
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                    {this.state.hovered.length !== 0 ? (
                        <div
                            className="sub-menu"
                            style={{
                                backgroundColor: this.rgb[
                                    this.state.backgroundColorchild
                                ]
                            }}
                        >
                            <ul className="sub-menu-ul">
                                <div className="Heading">
                                    {this.state.hoveredItem}
                                </div>
                                <div className="list-of-child-menu-items">
                                    {this.state.hovered.map((order, i) => {
                                        return (
                                            <div
                                                className="child-menu"
                                                onClick={() =>
                                                    this.ChildmenuItemClicked(
                                                        order
                                                    )}
                                            >
                                                {order.name}{" "}
                                                {order.data ? (
                                                    <i className="fa fa-angle-right" />
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
