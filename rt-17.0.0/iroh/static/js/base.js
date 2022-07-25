function computeBallmerPeak(x) {
    x = x * 100;
    return (
        1 - 1 / (1 + Math.exp(-(x - 6))) * .5 + Math.exp(-Math.pow(Math.abs(x - 10), 2) * 10)
    ) / 1.6;
}

var BallmerPeakCalculator = React.createClass({
    displayName: 'BallmerPeakCalculator',
    getInitialState: function () {
        return {
            bac: 0
        };
    },
    handleChange: React.autoBind(function () {
        this.setState({
            bac: this.refs.bac.getDOMNode().value
        });
    }),
    render: function () {
        var bac;
        var pct;
        pct = computeBallmerPeak(this.state.bac);
        if (isNaN(pct)) {
            pct = 'N/A';
        } else {
            pct = (100 - Math.round(pct * 100)) + '%';
        }
        return (
            React.DOM.div(null, [
                React.DOM.img({
                    src: "./ballmer_peak.png"
                }, null),
                React.DOM.p(null, ["Credit due to ", React.DOM.a({
                    href: "http://xkcd.com/323/"
                }, "xkcd"), "."]),
                React.DOM.h4(null, "Compute your Ballmer Peak:"),
                React.DOM.p(null, [
                    " If your BAC is", ' ',
                    React.DOM.input({
                        ref: "bac",
                        type: "text",
                        onKeyUp: this.handleChange,
                        value: this.state.bac
                    }, null),
                    ', ', "then ", React.DOM.b(null, pct), " of your lines of code will have bugs. "
                ])
            ])
        );
    }
});
var blc = BallmerPeakCalculator(null, null);
React.renderComponent(blc, document.getElementById('container'));