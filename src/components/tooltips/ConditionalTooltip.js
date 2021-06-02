import {Box, Tooltip} from "@material-ui/core";

function ConditionalTooltip({title, children, ...rest}) {
    if (!!title) {
        return (
            <Tooltip title={title} {...rest}>
                {children}
            </Tooltip>
        );
    }

    return (
        <Box>
            {children}
        </Box>
    );
}

export default ConditionalTooltip;