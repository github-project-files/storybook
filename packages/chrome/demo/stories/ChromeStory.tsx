/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { MouseEventHandler, ReactElement, useState } from 'react';
import { Story } from '@storybook/react';
import { ChatIcon } from './rchat';
import { ConnectIcon } from './connect';
import { ExploreIcon } from './explore';
import { GuideIcon } from './guide';
import { MessageIcon } from './message';
import { SupportIcon } from './support';
import { TalkIcon } from './relationship';
import { ProductIcon } from './garden';
import { BrandmarkIcon } from './brand';
import { NavIcon } from './app';
import { NavIcon1 } from './home';
import { NavIcon2 } from './email';
import { NavIcon3 } from './customerlist';
import { NavIcon4 } from './chat';
import { NavIcon5 } from './dashboard';
import { NavIcon6 } from './settings';
import { HeaderIcon } from './box';
import { HeaderIcon1 } from './search';
import { HeaderIcon2 } from './lifesaver';
import { HeaderIcon3 } from './chrome';
import { HeaderIcon4 } from './user-solo';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import {
  Body,
  Chrome,
  CollapsibleSubNavItem,
  Content,
  Footer,
  FooterItem,
  Header,
  HeaderItem,
  HeaderItemIcon,
  HeaderItemText,
  HeaderItemWrapper,
  IChromeProps,
  INavItemProps,
  Main,
  Nav,
  NavItem,
  NavItemIcon,
  NavItemText,
  PRODUCT,
  Sidebar,
  SkipNav,
  SubNav,
  SubNavItem,
  SubNavItemText
} from '@zendeskgarden/react-chrome';
import { Button } from '@zendeskgarden/react-buttons';
import { IFooterItem, IHeaderItem, INavItem, ISubNavItem } from './types';
import { SheetComponent } from './SheetStory';

const HEADER_ICONS = [
  <HeaderIcon1 key={1} />,
  <HeaderIcon2 key={2} />,
  <HeaderIcon3 key={3} />,
  <HeaderIcon4 key={4} />
];

const NAV_ICONS = [
  <NavIcon1 key={1} />,
  <NavIcon2 key={2} />,
  <NavIcon3 key={3} />,
  <NavIcon4 key={4} />,
  <NavIcon5 key={5} />,
  <NavIcon6 key={6} />
];

const PRODUCT_ICONS: Record<PRODUCT, ReactElement<SVGElement>> = {
  chat: <ChatIcon />,
  connect: <ConnectIcon />,
  explore: <ExploreIcon />,
  guide: <GuideIcon />,
  message: <MessageIcon />,
  support: <SupportIcon />,
  talk: <TalkIcon />
};

interface IArgs extends IChromeProps {
  product: INavItemProps['product'];
  skipNav: string;
  hasNav: boolean;
  navItems: INavItem[];
  onNavClick: ({ hasSubNav, hasSidebar }: Record<string, boolean | undefined>) => void;
  hasLogo: boolean;
  hasBrandmark: boolean;
  hasSubNav: boolean;
  subNavItems: ISubNavItem[];
  subNavMaxWidth: number;
  hasHeader: boolean;
  headerItems: IHeaderItem[];
  hasSidebar: boolean;
  hasFooter: boolean;
  footerItems: IFooterItem[];
  isExpanded: boolean;
  isWrapped: boolean;
  sidebar: string;
  main: string;
  isSheetOpen: boolean;
  isSheetCompact: boolean;
  sheetBody: string;
  sheetTitle: string;
  sheetDescription: string;
  onSheetClick: MouseEventHandler<HTMLButtonElement>;
}

export const ChromeStory: Story<IArgs> = ({
  product,
  skipNav,
  hasNav,
  navItems,
  onNavClick,
  hasLogo,
  hasBrandmark,
  hasSubNav,
  subNavItems,
  subNavMaxWidth,
  hasHeader,
  headerItems,
  hasSidebar,
  hasFooter,
  footerItems,
  isExpanded,
  isWrapped,
  sidebar,
  main,
  isSheetOpen,
  isSheetCompact,
  sheetBody,
  sheetTitle,
  sheetDescription,
  onSheetClick,
  ...args
}) => {
  const [currentNav, setCurrentNav] = useState(0);
  const [currentSubNav, setCurrentSubNav] = useState(0);

  return (
    <Chrome {...args} style={{ margin: `-${DEFAULT_THEME.space.xl}` }}>
      <SkipNav targetId="main-content">{skipNav}</SkipNav>
      {hasNav && (
        <Nav isExpanded={isExpanded} aria-label="Nav">
          {hasLogo && (
            <NavItem hasLogo product={product}>
              <NavItemIcon>{product ? PRODUCT_ICONS[product] : <ProductIcon />}</NavItemIcon>
              <NavItemText>Nav Logo</NavItemText>
            </NavItem>
          )}
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              isCurrent={currentNav === index}
              onClick={() => {
                setCurrentNav(index);
                setCurrentSubNav(0);
                onNavClick({ hasSubNav: item.hasSubNav, hasSidebar: item.hasSidebar });
              }}
            >
              <NavItemIcon>{NAV_ICONS[index] || <NavIcon />}</NavItemIcon>
              <NavItemText isWrapped={isWrapped}>{item.text}</NavItemText>
            </NavItem>
          ))}
          {hasBrandmark && (
            <NavItem hasBrandmark>
              <NavItemIcon>
                <BrandmarkIcon />
              </NavItemIcon>
              <NavItemText>Brandmark</NavItemText>
            </NavItem>
          )}
        </Nav>
      )}
      {hasSubNav && (
        <SubNav style={{ maxWidth: subNavMaxWidth }}>
          {subNavItems.map((item, index) =>
            item.items ? (
              <CollapsibleSubNavItem key={index} header={item.text}>
                {item.items.map((subItem, subIndex) => (
                  <SubNavItem
                    key={subIndex}
                    isCurrent={currentSubNav === parseFloat(`${index}.${subIndex}`)}
                    onClick={() => setCurrentSubNav(parseFloat(`${index}.${subIndex}`))}
                  >
                    <SubNavItemText isWrapped={isWrapped}>{subItem}</SubNavItemText>
                  </SubNavItem>
                ))}
              </CollapsibleSubNavItem>
            ) : (
              <SubNavItem
                key={index}
                isCurrent={currentSubNav === index}
                onClick={() => setCurrentSubNav(index)}
              >
                <SubNavItemText isWrapped={isWrapped}>{item.text}</SubNavItemText>
              </SubNavItem>
            )
          )}
        </SubNav>
      )}
      <Body hasFooter={hasFooter}>
        {hasHeader && (
          <Header isStandalone={!(hasNav || hasSubNav)}>
            {hasLogo && (
              <HeaderItem hasLogo product={product}>
                <HeaderItemIcon>
                  <SupportIcon />
                </HeaderItemIcon>
                <HeaderItemText>Header Logo</HeaderItemText>
              </HeaderItem>
            )}
            {headerItems.map((item, index) =>
              item.isWrapper ? (
                <HeaderItemWrapper
                  key={index}
                  maxX={item.maxX}
                  maxY={item.maxY}
                  isRound={item.isRound}
                >
                  {item.hasIcon && (
                    <HeaderItemIcon>
                      {HEADER_ICONS[HEADER_ICONS.length - headerItems.length + index] || (
                        <HeaderIcon />
                      )}
                    </HeaderItemIcon>
                  )}
                  <HeaderItemText isClipped={item.isClipped}>{item.text}</HeaderItemText>
                </HeaderItemWrapper>
              ) : (
                <HeaderItem key={index} maxX={item.maxX} maxY={item.maxY} isRound={item.isRound}>
                  {item.hasIcon && (
                    <HeaderItemIcon>
                      {HEADER_ICONS[HEADER_ICONS.length - headerItems.length + index] || (
                        <HeaderIcon />
                      )}
                    </HeaderItemIcon>
                  )}
                  <HeaderItemText isClipped={item.isClipped}>{item.text}</HeaderItemText>
                </HeaderItem>
              )
            )}
          </Header>
        )}
        <Content id="main-content">
          {hasSidebar && <Sidebar>{sidebar}</Sidebar>}
          <Main>{main}</Main>
          <SheetComponent
            hasHeader
            hasBody
            hasFooter
            hasClose
            isOpen={isSheetOpen}
            isCompact={isSheetCompact}
            title={sheetTitle}
            description={sheetDescription}
            body={sheetBody}
            footerItems={[{ text: 'Close', type: hasFooter ? undefined : 'primary' }]}
            onClick={onSheetClick}
            {...args}
          />
        </Content>
        {hasFooter && (
          <Footer>
            {footerItems &&
              footerItems.map(({ text, type }, index) => (
                <FooterItem key={index}>
                  <Button isBasic={type === 'basic'} isPrimary={type === 'primary'}>
                    {text}
                  </Button>
                </FooterItem>
              ))}
          </Footer>
        )}
      </Body>
    </Chrome>
  );
};
