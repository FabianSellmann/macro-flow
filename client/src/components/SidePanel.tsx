'use client';

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type SidePanelPlacement = 'left' | 'right';

export interface SidePanelProps extends Omit<DrawerProps, 'placement'> {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;
  /**
   * Callback when the panel should close
   */
  onClose: () => void;
  /**
   * Title displayed in the panel header
   */
  title?: string;
  /**
   * Content to display in the panel body
   */
  children: ReactNode;
  /**
   * Which side of the screen the panel should slide in from
   * @default 'right'
   */
  placement?: SidePanelPlacement;
  /**
   * Size of the panel (width)
   * Can be a preset size ('xs', 'sm', 'md', 'lg', 'xl', 'full') or a custom value (e.g., '400px', '50%')
   * @default 'md'
   */
  size?: string;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking the overlay should close the panel
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing Escape should close the panel
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Custom header content (overrides title if provided)
   */
  headerContent?: ReactNode;
  /**
   * Custom footer content
   */
  footerContent?: ReactNode;
  /**
   * Whether the panel should be full screen on mobile
   * @default true
   */
  isFullHeight?: boolean;
}

/**
 * SidePanel Component
 * 
 * A reusable side panel/drawer component that slides in from the left or right side of the screen.
 * Built on top of ChakraUI's Drawer component with additional flexibility.
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <SidePanel
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Settings"
 *   placement="right"
 *   size="md"
 * >
 *   <p>Panel content goes here</p>
 * </SidePanel>
 * ```
 */
export function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  placement = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  headerContent,
  footerContent,
  isFullHeight = true,
  ...drawerProps
}: SidePanelProps) {
  // Responsive size handling - full screen on mobile by default
  const responsiveSize = useBreakpointValue({
    base: isFullHeight ? 'full' : size,
    md: size,
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size={responsiveSize}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      {...drawerProps}
    >
      <DrawerOverlay />
      <DrawerContent>
        {showCloseButton && <DrawerCloseButton />}
        {headerContent || (title && <DrawerHeader>{title}</DrawerHeader>)}
        <DrawerBody
          overflowY="auto"
          flex="1"
          display="flex"
          flexDirection="column"
        >
          {children}
        </DrawerBody>
        {footerContent && (
          <Box
            as="footer"
            p={4}
            borderTop="1px solid"
            borderColor="gray.200"
          >
            {footerContent}
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
}

